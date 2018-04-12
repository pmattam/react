const root = document.querySelector('.react-root');
const h = React.createElement;

let h1 = h('h1', { className: 'header' }, 'Hello Prathyusha!');
let p = h('p', {}, 'Here is some text!');
let footer = h('footer', null, 'copyright 2018');

let wrapper = h('div', null, [h1, p, footer]);

ReactDOM.render(wrapper, root);