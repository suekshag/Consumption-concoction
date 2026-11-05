# Consumption Concoction

*Everything you consume comes with something you didn't order.*

An interactive, illustrated editorial website that turns everyday consumption into a recipe. Add the things you eat, wear, use, watch and apply to a cooking pot, choose your city, and see the hidden side effects of your concoction, with substitutes, a personal receipt, and the Swap Kitchen.

## Run it

`index.html` is fully self-contained (all illustrations are embedded). Open it in a browser, or publish it with GitHub Pages:

1. Push this repository to GitHub.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. The site will be live at `https://<your-username>.github.io/<repo-name>/`.

It loads React, htm and html2canvas from public CDNs and fonts from Google Fonts, so it needs an internet connection.

## Edit it

The source lives in `src/`:

| File | What it holds |
|---|---|
| `data.js` | Every consumption item: facts, sources, substitutes, city estimates and receipt assumptions |
| `app.js` | Pages: home, kitchen, city, cooking, ready, results, receipt, menu, about |
| `swap.js` | The Swap Kitchen: categories, substitutes, illustrations and the map |
| `char.js` | The personalised consumption character |
| `style.css` | All styles and colour tokens |
| `assets.js`, `charlayers.js` | Embedded illustrations (base64 images) |

After editing, rebuild `index.html` with Python 3:

```
python3 build.py
```

## Fonts

Headlines are designed for **Classy Vogue**. It is not bundled, so the site falls back to **Italiana**. To use Classy Vogue, add its font file and an `@font-face` rule for `"Classy Vogue"` in `src/style.css`. Body text uses **Crimson Text**; the receipt uses **Courier Prime**.

## Note on data

Facts link to their sources on each card. City figures are provisional modeled estimates, and the Swap Kitchen map and store locations are illustrative examples, not real stores.
