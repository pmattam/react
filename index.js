const root = document.querySelector('.react-root');
const h = React.createElement;

let blogs = [
    { id: '1', title: 'Veggie Ipsum 1', author: 'Author 1', body: 'Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.', isEditable: false },
    { id: '2', title: 'Veggie Ipsum 2', author: 'Author 2', body: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.', isEditable: false },
    { id: '3', title: 'Veggie Ipsum 3', author: 'Author 3', body: 'Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.', isEditable: false },
    { id: '4', title: 'Veggie Ipsum 4', author: 'Author 4', body: 'Beetroot water spinach okra water chestnut ricebean pea catsear courgette summer purslane.', isEditable: false },
];

let removeBlog = (blog) => {
    let { id } = blog;
    blogs = blogs.filter(blog => id !== blog.id);
    console.log(`Removed ${blog.title}`);
    updatePage();
};

let changeEditBlogState = (blogState) => {
    let blog = blogs.find(blog => blog.id === blogState.id);
    blog.isEditable = !blog.isEditable;
    console.log(blog.isEditable);
    updatePage();
};

let updateBlogBody = (blogObject, value) => {
    let blog = blogs.find(blog => blog.id === blogObject.id);
    console.log(blog);
    blog.body = value;
    updatePage();
};

let DeleteButton = (blog) => h('button', { onClick: () => removeBlog(blog) }, 'Delete');

let EditButton = (blogToEdit) => h('button', { onClick: () => changeEditBlogState(blogToEdit) }, 'Edit');

let EditBlogForm = (blogToEditInForm) => h('form', null, [h('input', { 'value': blogToEditInForm.body, onChange: (event) => updateBlogBody(blogToEditInForm, event.target.value) })]);

let BlogRow = (blog) =>
    h('ul', null, [
        h('h2', null, blog.title),
        h('h3', null, blog.author),
        h('p', null, blog.body),
        h(DeleteButton, blog),
        h(EditButton, blog),
        blog.isEditable && h(EditBlogForm, blog)
    ]);

let BlogList = ({ blogs }) => h('div', null, blogs.map(blog => h(BlogRow, blog, [])));

let Title = () => h('h1', null, 'About Veggies Ipsum Blog');

let Greeting = ({ person }) => h('h1', { className: 'header' }, `Good Morning ${person} !`);

let Footer = () => h('footer', null, 'copyright 2018');

let Page = () => h('div', null, [
    h(Title, null, []),
    h(Greeting, { person: 'Prathyusha' }, []),
    h(BlogList, { blogs: blogs }, []),
    h(Footer, null, [])
]);

let updatePage = () => ReactDOM.render(h(Page, { blogs: blogs }, []), root);

updatePage();