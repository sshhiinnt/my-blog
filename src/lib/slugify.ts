import slugify from "slugify";
import translate from "google-translate-api-x"


export async function generateSlug(title: string) {
    const res = await translate(title, { to: "en" });
    const translated = res.text;

    return slugify(translated, {
        lower: true,
        strict: true,
    })
}

