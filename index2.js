const root = document.querySelector('.react-root');
const h = React.createElement;

let generateGreeting = (name) => {
    return h('h1', { className: 'header' }, `Hello ${name}`);
}

let h1 = generateGreeting('Prathyusha');
let p = h('p', {}, 'Here is some text!');
let footer = h('footer', null, 'copyright 2018');

let wrapper = h('div', null, [h1, p, footer]);

ReactDOM.render(wrapper, root);