//Animate cards when they click on see more
import {$, $$} from './selector.js';
export const animateCard = (num)=>{
    //Apply animation to card
    $$(`.card-container`)[num].classList.add('animate-card');
}