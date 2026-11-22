# 🍔 Bun Voyage

Burgers, ribs & steak, rated around the world. A Jekyll site that GitHub Pages builds for you automatically.

**Live site:** https://akul23.github.io/bun-voyage/

## Adding a review (no installs needed)

1. On GitHub, open the `_templates/new-review.md` file and copy everything in it.
2. Go to the `_reviews` folder → **Add file → Create new file**.
3. Name it something like `smash-district-budapest.md`, paste, and fill in the fields.
4. **Photo (optional):** open `assets/images/reviews` → **Add file → Upload files**, upload a photo
   (e.g. `smash-district.jpg`), and set `image: /assets/images/reviews/smash-district.jpg` in the review.
5. Click **Commit changes**. The site updates in about a minute.

Coordinates: in Google Maps, right-click the restaurant and click the numbers at the top to copy `lat, lng`.

The leaderboard, map, home page and stats all update automatically from the reviews.

## Removing the samples

Delete the four `_reviews/sample-*.md` files once you've posted your own.

## Food types

Edit `food_types` in `_config.yml` to add a type (e.g. `hotdog`) with a label, emoji and colour.

## Custom domain later

Buy the domain, add it under **Settings → Pages → Custom domain**, then in `_config.yml` set
`baseurl: ""` and `url: "https://yourdomain"`.
