// colors.js
const customColors = {
    headerBgColor: '#0f4c81',
    headerBgSecondaryColor: '#dcecff',
    headerTextColor: '#ffffff',
    deleteBtnColor: '#dc3545',
    editBtnColor: '#0d6efd',
    accentColor: '#11a36a',
    surfaceColor: '#f8fbff',
    pageBgColor: '#eef5fb',

    // Navigation & Glassmorphic theme colors (Single Point of Control)
    navGlassBg: 'rgba(255, 255, 255, 0.94)',
    get navGlassBgSidebar() {
        return this.navGlassBg;
    },
    navBorderColor: 'rgba(15, 76, 129, 0.12)',
    navShadow: '0 8px 30px rgba(15, 76, 129, 0.08)',
    navShadowSidebar: '4px 0 25px rgba(15, 76, 129, 0.08)',

    // Primary Brand Gradients & Nav Pill backgrounds
    primaryGradient: 'linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)',
    brandLogoGradient: 'linear-gradient(135deg, #0f4c81 0%, #1f6ea8 100%)',
    activeNavBg: 'linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)',
    inactiveNavBg: '#eff6ff',
};

export default customColors;