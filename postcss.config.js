const purgecss = [
    "@fullhuman/postcss-purgecss",
    {
        content: [
            "./components/**/*.tsx",
            "./pages/**/*.tsx"
        ],
        // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        // This is the function used to extract class names from your templates
        defaultExtractor: content => {
            // Default settings
            const general = content.match(/[\w-/:]+(?<!:)/g) || []

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

            return general.concat(broadMatches.concat(innerMatches))
        }
    }
];
module.exports = {
    plugins: [
        "postcss-import",
        "tailwindcss",
        ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
    ]
};