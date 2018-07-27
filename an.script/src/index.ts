import { Classes } from './Classes';



const {Dispatcher} = Classes;

export class App {
    constructor() {

        const say = Dispatcher.say('Domain');

        console.log('App: ', say);
    }
}

new App();







// window.addEventListener("load", (ev: Event) => {
//   var racetrack = new SomeModule.RaceTrack(document.getElementById("content"));
// });
