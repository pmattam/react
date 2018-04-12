const root = document.querySelector('.react-root');

let element = React.createElement('h1', { className: 'header' }, 'Hello Prathyusha!');

ReactDOM.render(element, root);