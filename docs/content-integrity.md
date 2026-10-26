# Content integrity review (repository seed, 2026-10-26)

This is an editorial triage of `supabase/seed.sql`, not a claim about current production records. Production Supabase access was unavailable. No seed or production record was changed.

1. **High — provenance and category.** The schema contains no source/provenance or classification fields. The seed mixes original-language forms (e.g. YHWH), translated biblical titles (e.g. Yoruba “Ọba àwọn Ọba”), descriptive phrases and devotional expressions without marking which is which. Scripture references support a devotional association but do not by themselves establish historical usage or etymology. Before publishing linguistic certainty, editors should verify each original form, translation, tradition, pronunciation and etymological note against named sources. “Elohim” described as “plural of majesty” and “El Shaddai” linked to “breast” or “mountain” merit specialist review; do not silently treat either explanation as settled.
2. **High — relationships.** `related_names` is a `uuid[]`, with no foreign key. The seed populates relationships through subqueries by name. Duplicate names within one language, future edits, or deletion can leave unresolved or ambiguous references. Run a read-only live orphan check before and after content maintenance.
3. **Medium — duplicate text.** In 86 parsed seed rows across ten configured languages, no duplicate `(name, language)` pair or empty meaning/pronunciation was found. Four Chinese name strings recur in both Mandarin and Wu Chinese: 上帝, 神, 天父, 救主. They must retain distinct record identity and language context. Live data may differ; the production homepage reported 379 names at inspection.
4. **Medium — Scripture.** Seed entries contain scripture arrays, but reference format, verse-to-claim fit, translation choice, and malformed values were not verified against an authoritative text. Audit live rows for empty arrays and validate references in a separate editorial pass.
5. **Medium — pronunciation.** All parsed seed rows provide pronunciation text, but accuracy and dialect-specific pronunciation, especially Wu Chinese and Hebrew, require native speaker or specialist review. Text is not verified audio.

Read-only live queries for a Supabase SQL editor (do not execute seed.sql):

```sql
select language, name, count(*) from public.names_of_god group by language, name having count(*) > 1;
select id, name, language from public.names_of_god where nullif(trim(meaning), '') is null or nullif(trim(pronunciation), '') is null or coalesce(array_length(scripture_refs, 1), 0) = 0;
select n.id, n.name, r.related_id from public.names_of_god n cross join lateral unnest(coalesce(n.related_names, '{}'::uuid[])) r(related_id) left join public.names_of_god target on target.id = r.related_id where target.id is null;
select language, count(*) from public.names_of_god group by language order by language;
```
