import { $, $$ } from "./selector.js";
export const program = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const square = document.querySelector(".main__image > img");
            if (entry.isIntersecting) {
                square.classList.add("animate3dImg");
                return; // if we added the class, exit the function
            }
            // We're not intersecting, so remove the class!
            square.classList.remove("animate3dImg");
        });
    });
    observer.observe($(".main__image > img"));
};