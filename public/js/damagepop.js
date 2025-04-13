document.addEventListener('DOMContentLoaded', () => {
    // Wait until the page content is fully loaded before running the script

    // const appContent = document.querySelector('.main-main-main');
    // This is your wrapper div where new content (like your buttons) is dynamically injected

    MAIN.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]');
        // e.target: the actual element that was clicked (could be SVG inside a button)
        // closest('[data-action]'): moves up the DOM tree to find the nearest element
        // with a data-action attribute — this helps target the correct button even if a child (like <svg>) is clicked
        // The question mark "?" you saw earlier is a **"Optional Chaining Operator"** (explained below)

        if (!action) return; // if no action button was found, do nothing

        const input = action.closest('.plus-minus-input')?.querySelector('input');
        // Go to the nearest .plus-minus-input parent and find its <input> inside
        // The `?.` is optional chaining:
        // ✅ It prevents your code from crashing if the element doesn’t exist
        // So if `.closest('.plus-minus-input')` is null, it won’t try to call `.querySelector('input')` on it

        if (!input) return; // If the input is not found (safety check), do nothing

        // Check what kind of button was clicked (increment or decrement)
        if (action.dataset.action === 'increment') {
            input.value = Number(input.value) + 1; // increase the input's value
        }

        if (action.dataset.action === 'decrement') {
            input.value = Math.max(0, Number(input.value) - 1); // decrease but not below 0
        }
    });



});

function setupDynamicFormSubmission_for_Update(btn_active_after_submission) {
    const form = document.querySelector('[data-form="damagedUpdateForm"]');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const count = formData.get('count');
        let urlEncodedData = new URLSearchParams(formData).toString();
        const actionUrl = form.getAttribute('action');

        try {
            const res = await fetch(actionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            });
            let result = await res.json();
            btn_active_after_submission.dispatchEvent(new Event('click'));
        } catch (err) {
            console.error(err);
        }
    });
}
function setupDynamicFormSubmission_for_Delete(btn_active_after_submission) {
    const form = document.querySelector('[data-form="deleteProductForm"]');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const count = formData.get('count');
        let urlEncodedData = new URLSearchParams(formData).toString();
        const actionUrl = form.getAttribute('action');

        try {
            const res = await fetch(actionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            });
            let result = await res.json();
            btn_active_after_submission.dispatchEvent(new Event('click'));
        } catch (err) {
            console.error(err);
        }
    });
}
