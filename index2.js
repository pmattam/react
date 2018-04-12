const root = document.querySelector('.react-root');
const h = React.createElement;

let Greeting = ({ name }) =>
    h('h1', { className: 'header' }, `Hello ${name}`);

let Message = () =>
    h('p', {}, 'Here is some text!');

let Footer = () =>
    h('footer', null, 'copyright 2018');

let wrapper = h('div', null, [
    h(Greeting, { name: 'Prathyusha' }, []),
    h(Message, null, []),
    h(Footer, null, [])
]);

ReactDOM.render(wrapper, root);