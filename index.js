const root = document.querySelector('.react-root');

let blogs = [
    { id: '1', title: 'Veggie Ipsum 1', author: 'Author 1', body: 'Veggies es bonus vobis' },
    { id: '2', title: 'Veggie Ipsum 2', author: 'Author 2', body: 'Turnip greens ricebean' },
    { id: '3', title: 'Veggie Ipsum 3', author: 'Author 3', body: 'Grape wattle seed' },
    { id: '4', title: 'Veggie Ipsum 4', author: 'Author 4', body: 'Beetroot water spinach okra' },
];

let DeleteButton = ({ blog, removeBlog }) => 
    <button onClick={() => removeBlog(blog)}>Delete</button>

let EditButton = ({ blog, changeEditBlogState }) => 
    <button onClick={() => changeEditBlogState(blog)}>Edit</button>

let EditBlogForm = ({ blog, currentlyEditingBlog, updateBlogTitle, updateBlogBody, saveUpdatedBlog }) => 
    <form>
        <input key="1" value={currentlyEditingBlog.title} onChange={(event) => updateBlogTitle(currentlyEditingBlog, event.target.value)} />
        <input key="2" value={currentlyEditingBlog.body} onChange={(event) => updateBlogBody(currentlyEditingBlog, event.target.value)} />
        <button onClick={() => saveUpdatedBlog(currentlyEditingBlog)}>Save</button>
    </form>

let BlogRow = ({ blog, currentlyEditingBlog, removeBlog, changeEditBlogState, updateBlogTitle, updateBlogBody, saveUpdatedBlog }) =>
    <div>
        <h2>{blog.title}</h2>
        <h3>{blog.author}</h3>
        <p>{blog.body}</p>
        <DeleteButton 
            blog={blog}
            removeBlog={removeBlog}
        />
        <EditButton 
            blog={blog}
            changeEditBlogState={changeEditBlogState}
        />
        {
            currentlyEditingBlog && blog.id === currentlyEditingBlog.id && 
            <EditBlogForm 
                blog={blog}
                currentlyEditingBlog={currentlyEditingBlog}
                updateBlogTitle={updateBlogTitle}
                updateBlogBody={updateBlogBody}
                saveUpdatedBlog={saveUpdatedBlog}
            />
        }
    </div>

let BlogList = ({ blogs, currentlyEditingBlog, removeBlog, changeEditBlogState, updateBlogTitle, updateBlogBody, saveUpdatedBlog }) =>
    <div>
        {
            blogs.map(blog =>
            <BlogRow 
                blog={blog}
                currentlyEditingBlog={currentlyEditingBlog}
                removeBlog={removeBlog}
                changeEditBlogState={changeEditBlogState}
                updateBlogTitle={updateBlogTitle}
                updateBlogBody={updateBlogBody}
                saveUpdatedBlog={saveUpdatedBlog}    
            />)
        }        
    </div>

let Title = () => 
    <h1>About Veggie Ipsum Blog</h1>

let Greeting = ({ person }) => 
    <h1 className="header">Good Morning {person}!</h1>

let Footer = () => 
    <footer>copyright 2018</footer>

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

        let removeBlog = (rmBlog) => {
            let { id } = rmBlog;
            let updatedBlogs = blogs.filter(blog => id !== blog.id);
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
                <Footer />
            </div>
        )      
    }
}

ReactDOM.render(<Page />, root);