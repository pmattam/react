const root = document.querySelector('.react-root');
const h = React.createElement;

let blogs = [
    { id: '1', title: 'Veggie Ipsum 1', author: 'Author 1', body: 'Veggies es bonus vobis' }
    // { id: '2', title: 'Veggie Ipsum 2', author: 'Author 2', body: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.' },
    // { id: '3', title: 'Veggie Ipsum 3', author: 'Author 3', body: 'Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.' },
    // { id: '4', title: 'Veggie Ipsum 4', author: 'Author 4', body: 'Beetroot water spinach okra water chestnut ricebean pea catsear courgette summer purslane.' },
];

let currentlyEditingBlog = null;

let removeBlog = (blog) => {
    let { id } = blog;
    blogs = blogs.filter(blog => id !== blog.id);
    console.log(`Removed ${blog.title}`);
    updatePage();
};

let changeEditBlogState = (blogState) => {
    currentlyEditingBlog = Object.assign({}, blogState);
    updatePage();
};

let updateBlogBody = (blogObject, value) => {
    let blog = blogs.find(blog => blog.id === blogObject.id);
    blogObject.body = value;
    updatePage();
};

let saveUpdatedBlog = (blogBeingEditedToSave) => {
    let blog = blogs.find(blog => blog.id === blogBeingEditedToSave.id);
    Object.assign(blog, blogBeingEditedToSave);
    currentlyEditingBlog = null;
    updatePage();
};

let DeleteButton = (blog) => h('button', { onClick: () => removeBlog(blog) }, 'Delete');

let EditButton = (blogToEdit) => h('button', { onClick: () => changeEditBlogState(blogToEdit) }, 'Edit');

let EditBlogForm = (blogToEditInForm) => h('form', null, [
    h('input', { 'value': currentlyEditingBlog.body, onChange: (event) => updateBlogBody(currentlyEditingBlog, event.target.value) }),
    h('button', { onClick: () => saveUpdatedBlog(currentlyEditingBlog) }, 'Save')
]);

let BlogRow = (blog) =>
    h('ul', null, [
        h('h2', null, blog.title),
        h('h3', null, blog.author),
        h('p', null, blog.body),
        h(DeleteButton, blog),
        h(EditButton, blog),
        currentlyEditingBlog && blog.id === currentlyEditingBlog.id && h(EditBlogForm, blog)
    ]);

let BlogList = ({ blogs }) => h('div', null, blogs.map(blog => h(BlogRow, blog, [])));

let Title = () => h('h1', null, 'About Veggies Ipsum Blog');

let Greeting = ({ person }) => h('h1', { className: 'header' }, `Good Morning ${person} !`);

let Footer = () => h('footer', null, 'copyright 2018');

// let Page = () => h('div', null, [
//     h(Title, null, []),
//     h(Greeting, { person: 'Prathyusha' }, []),
//     h(BlogList, { blogs: blogs }, []),
//     h(Footer, null, [])
// ]);

// let updatePage = () => ReactDOM.render(h(Page, { blogs: blogs }, []), root);

// updatePage();

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: blogs,
            currentlyEditingBlog: null
        }
    }

    render() {
        let { blogs, currentlyEditingBlog } = this.state;

        return h('div', null, [
            h(Title, null, []),
            h(Greeting, { person: 'Prathyusha' }, []),
            h(BlogList, { blogs: blogs }, []),
            h(Footer, null, [])
        ]);
    }
}

ReactDOM.render(h(Page), root)