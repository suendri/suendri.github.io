(() => {
    'use strict'

    /* Siderbar */
    /* https://github.com/codzsword/bootstrap-admin-dashboard */

    document.querySelector("#sidebar-toggle").addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });

})()