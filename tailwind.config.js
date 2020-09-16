module.exports = {
    purge: [],
    theme: {
        container: {
            center: true
        },
        extend: {
            colors: {
                'main': '#00bcd4',
                'main-dark': '#008ba3',
                'main-light': '#62efff',
                'accent': '#f8bbd0',
                'accent-dark': '#c48b9f',
                'accent-light': '#ffeeff',
                'black-light': '#292929',
                'black-48': '#484848',
                'gray-f6': '#f6f6f6',
                'gray-ea': '#eaeaea',
                'blue-54': '#373e54',
                'blue-c3': '#9fa8c3',
            },
            boxShadow: {
                '4-layer': `0 1px 1px rgba(0,0,0,0.15), 
                0 2px 2px rgba(0,0,0,0.15), 
                0 4px 4px rgba(0,0,0,0.15), 
                0 8px 8px rgba(0,0,0,0.15)`,
                '5-layer': `0 1px 1px rgba(0,0,0,0.12), 
                0 2px 2px rgba(0,0,0,0.12), 
                0 4px 4px rgba(0,0,0,0.12), 
                0 8px 8px rgba(0,0,0,0.12),
                0 16px 16px rgba(0,0,0,0.12)`,
                '6-layer': `0 1px 1px rgba(0,0,0,0.11), 
                0 2px 2px rgba(0,0,0,0.11), 
                0 4px 4px rgba(0,0,0,0.11), 
                0 8px 8px rgba(0,0,0,0.11), 
                0 16px 16px rgba(0,0,0,0.11), 
                0 32px 32px rgba(0,0,0,0.11)`,
            },
            borderRadius: {
                '2.5rem': '2.5rem'
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
        textColor: ['responsive', 'hover', 'focus', 'active']
    },
    plugins: [],
    purge: false,
}
