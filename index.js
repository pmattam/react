const root = document.querySelector('.react-root');
const h = React.createElement;

let blogs = [
    { title: 'title1', author: 'author1', body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
    { title: 'title2', author: 'author2', body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
    { title: 'title3', author: 'author3', body: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.' },
    { title: 'title4', author: 'author4', body: 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.' },
];

let BlogList = ({ blogs }) => {
    let vdoms = [];
    for (let blog of blogs) {
        let blogVdom = h('div', null, [
            h('h1', null, blog.title),
            h('h2', null, blog.author),
            h('p', null, blog.body),
        ])
        vdoms.push(blogVdom);
    }
    return h('div', null, vdoms);
};

let Title = () => h('h1', null, 'REACT');

let Greeting = ({ person }) => h('h1', { className: 'header' }, `Hello ${person}`);

let Footer = () => h('footer', null, 'copyright 2018');

let Page = () => h('div', null, [
    h(Title, null, []),
    h(Greeting, { person: 'Prathyusha' }, []),
    h(BlogList, { blogs: blogs }, []),
    h(Footer, null, [])
]);

ReactDOM.render(h(Page, null, []), root);