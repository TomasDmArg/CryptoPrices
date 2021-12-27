import { $, $$ } from "./selector.js";
// export const program = () => {
//     let elementExists = [$(".main__image > img"), true];
//     elementExists[1] = (elementExists[0]) ? elementExists[1] = true : elementExists[1] = false;
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             const square = document.querySelector(".main__image > img");
//             if (entry.isIntersecting && elementExists[1]) {
//                 square.classList.add("animate3dImg");
//                 return; // if we added the class, exit the function
//             }
//             // We're not intersecting, so remove the class!
//             if(elementExists[1]) {
//                 square.classList.remove("animate3dImg");
//             }
//         });
//     });
//     if(elementExists[1]){
//         observer.observe($(".main__image > img"));
//     }else{
//         // Remove observer
//         observer.disconnect();
//     }
// };