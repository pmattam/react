const root = document.querySelector('.react-root');
const h = React.createElement;

let blogs = [
    { id: '1', title: 'Veggie Ipsum 1', author: 'Author 1', body: 'Veggies es bonus vobis' },
    { id: '2', title: 'Veggie Ipsum 2', author: 'Author 2', body: 'Turnip greens ricebean' },
    { id: '3', title: 'Veggie Ipsum 3', author: 'Author 3', body: 'Grape wattle seed' },
    { id: '4', title: 'Veggie Ipsum 4', author: 'Author 4', body: 'Beetroot water spinach okra' },
];

let DeleteButton = ({ blog, removeBlog }) => h('button', { onClick: () => removeBlog(blog) }, 'Delete');

let EditButton = ({ blog, changeEditBlogState }) => h('button', { onClick: () => changeEditBlogState(blog) }, 'Edit');

let EditBlogForm = ({ blog, currentlyEditingBlog, updateBlogTitle, updateBlogBody, saveUpdatedBlog }) => h('form', null, [
    h('input', { 'value': currentlyEditingBlog.title, onChange: (event) => updateBlogTitle(currentlyEditingBlog, event.target.value) }),
    h('input', { 'value': currentlyEditingBlog.body, onChange: (event) => updateBlogBody(currentlyEditingBlog, event.target.value) }),
    h('button', { onClick: () => saveUpdatedBlog(currentlyEditingBlog) }, 'Save')
]);

let BlogRow = ({ blog, currentlyEditingBlog, removeBlog, changeEditBlogState, updateBlogTitle, updateBlogBody, saveUpdatedBlog }) =>
    h('ul', null, [
        h('h2', null, blog.title),
        h('h3', null, blog.author),
        h('p', null, blog.body),
        h(DeleteButton, { blog, removeBlog }),
        h(EditButton, { blog, changeEditBlogState }),
        currentlyEditingBlog && blog.id === currentlyEditingBlog.id && h(EditBlogForm, { blog, currentlyEditingBlog, updateBlogTitle, updateBlogBody, saveUpdatedBlog })
    ]);

let BlogList = ({ blogs, currentlyEditingBlog, removeBlog, changeEditBlogState, updateBlogTitle, updateBlogBody, saveUpdatedBlog }) =>
    h('div', null, blogs.map(blog => h(BlogRow, { blog, currentlyEditingBlog, removeBlog, changeEditBlogState, updateBlogTitle, updateBlogBody, saveUpdatedBlog })));

let Title = () => h('h1', null, 'About Veggies Ipsum Blog');

let Greeting = ({ person }) => h('h1', { className: 'header' }, `Good Morning ${person} !`);

let Footer = () => h('footer', null, 'copyright 2018');

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* this blogs has value of blogs array at the top */
            blogs: blogs,
            currentlyEditingBlog: null
        }
    }

    render() {
        let { blogs, currentlyEditingBlog } = this.state;
        /* state changes here when we remove a blog so moving it in here so when it does Page component handles rendering */
        let removeBlog = (rmBlog) => {
            let { id } = rmBlog;
            let updatedBlogs = blogs.filter(blog => id !== blog.id);
            /* setState and update the data source */
            this.setState({
                blogs: updatedBlogs
            });
        };

        let changeEditBlogState = (blogState) => {
            this.setState({
                currentlyEditingBlog: Object.assign({}, blogState)
            });
        };

        let updateBlogTitle = (blogObjectForTitle, value) => {
            blogObjectForTitle.title = value;
            this.setState({
                currentlyEditingBlog: Object.assign({}, blogObjectForTitle)
            });
        };
        
        let updateBlogBody = (blogObjectForBody, value) => {
            blogObjectForBody.body = value;
            this.setState({
                currentlyEditingBlog: Object.assign({}, blogObjectForBody)
            });
        };

        let saveUpdatedBlog = (blogBeingEditedToSave) => {
            let blog = blogs.find(blog => blog.id === blogBeingEditedToSave.id);
            Object.assign(blog, blogBeingEditedToSave);
            this.setState({    
                currentlyEditingBlog: null
            });

        };
                
        return (
            <div>
                <Title />
                <Greeting person="Prathyusha" />
                <BlogList 
                    blogs={blogs} 
                    currentlyEditingBlog={currentlyEditingBlog}
                    removeBlog={removeBlog}
                    changeEditBlogState={changeEditBlogState}
                    updateBlogTitle={updateBlogTitle}
                    updateBlogBody={updateBlogBody}
                    saveUpdatedBlog={saveUpdatedBlog}
                />
            </div>
        )
            
    }
}

ReactDOM.render(<Page />, root);