const root = document.querySelector('.react-root');
const h = React.createElement;

let blogs = [
    { id: '1', title: 'Veggie Ipsum 1', author: 'Author 1', body: 'Veggies es bonus vobis' },
    { id: '2', title: 'Veggie Ipsum 2', author: 'Author 2', body: 'Turnip greens ricebean' },
    { id: '3', title: 'Veggie Ipsum 3', author: 'Author 3', body: 'Grape wattle seed' },
    { id: '4', title: 'Veggie Ipsum 4', author: 'Author 4', body: 'Beetroot water spinach okra' },
];

let currentlyEditingBlog = null;

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

let DeleteButton = ({ blog, removeBlog }) => h('button', { onClick: () => removeBlog(blog) }, 'Delete');

let EditButton = (blogToEdit) => h('button', { onClick: () => changeEditBlogState(blogToEdit) }, 'Edit');

let EditBlogForm = (blogToEditInForm) => h('form', null, [
    h('input', { 'value': currentlyEditingBlog.body, onChange: (event) => updateBlogBody(currentlyEditingBlog, event.target.value) }),
    h('button', { onClick: () => saveUpdatedBlog(currentlyEditingBlog) }, 'Save')
]);

let BlogRow = ({ blog, removeBlog }) =>
    h('ul', null, [
        h('h2', null, blog.title),
        h('h3', null, blog.author),
        h('p', null, blog.body),
        h(DeleteButton, { blog, removeBlog }),
        h(EditButton, blog),
        currentlyEditingBlog && blog.id === currentlyEditingBlog.id && h(EditBlogForm, blog)
    ]);

let BlogList = ({ blogs, removeBlog }) => h('div', null, blogs.map(blog => h(BlogRow, { blog, removeBlog })));

let Title = () => h('h1', null, 'About Veggies Ipsum Blog');

let Greeting = ({ person }) => h('h1', { className: 'header' }, `Good Morning ${person} !`);

let Footer = () => h('footer', null, 'copyright 2018');

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* this stateBlogs has value of blogs array at the top */
            blogs: blogs,
            currentlyEditingBlog: null
        }
    }

    render() {
        let { blogs, currentlyEditingBlog } = this.state;

        /* state changes here when we remove a blog so moving it in here so when it does Page component handles rendering */
        let removeBlog = (rmBlog) => {
            let { id } = rmBlog;
            // console.log("THIS STATE BLOGS", this.state.stateBlogs);
            // let removedBlog = this.state.stateBlogs.filter(blog => id !== blog.id);
            let updatedBlogs = blogs.filter(blog => id !== blog.id);
            /* setState and update the data source */
            this.setState({
                blogs: updatedBlogs
            });
        };

        return h('div', null, [
            h(Title),
            h(Greeting, { person: 'Prathyusha' }),
            h(BlogList, { blogs, removeBlog }),
            h(Footer)
        ]);
    }
}

ReactDOM.render(h(Page), root)