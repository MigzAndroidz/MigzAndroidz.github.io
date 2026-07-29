(function () {
    var saved = localStorage.getItem('theme') || 'system';
    var theme = saved === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : saved;
    document.documentElement.setAttribute('data-theme', theme);
})();