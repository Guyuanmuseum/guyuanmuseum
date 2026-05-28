# Featured Collections Direct Fix

Upload these files into the same paths in the GitHub repository:

- `index.html`
- `src/js/main.js`
- `src/data/README.md`
- `src/data/public/README.md`
- `src/data/public/manifest.json`

This removes the runtime dependency on:

- `src/data/public/featured-collections.json`

The homepage Featured Collections section now uses the three uploaded artwork files directly from:

- `assets/artworks/GY-003_Crossing_the_Yangtze_River_1949_master.jpeg`
- `assets/artworks/GY-005_Human_Bridge_1948_master.jpeg`
- `assets/artworks/GY-001_Early_Spring_1979_master.jpeg`

If `src/data/public/featured-collections.json` still exists in GitHub, it can be deleted, but the fixed homepage no longer requests it.

After these files are uploaded to the connected GitHub repository, Vercel should redeploy automatically.
