const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/(avatar|dropdown|modal|menu|divider|popover|button|ripple|spinner).js"
    ],
    theme: {
        extend: {
            boxShadow: {
                'custom': '5px 5px #bb1f3b',
                myShadow1: "4.1px -5px 0 0 rgb(17,24,39)",
                myShadow2: "-4.1px -5px 0 0 rgb(17,24,39)",
            },
            colors: {
                primary: {
                    light: '#f70430',
                    DEFAULT: '#cf1839',
                    dark: '#bb1f3b',
                    sign: 'rgb(252, 252, 252)'

                },
                seconadary: {
                    DEFAULT: '#222222',
                    light: '#222222ed',
                    outline: '#777777',
                }
            },
            transitionProperty: {
                right: 'right',
                left: 'left',
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(45deg, #f7002e, #f01d44, #ff012f)',
            },
        },
    },
    plugins: [nextui()],
};
