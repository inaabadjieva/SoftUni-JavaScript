function solve() {
	class Post{
		constructor(title, content){
			this.title = title
			this.content = content
		}
		toString(){
			return `Post: ${this.title}\nContent: ${this.content}`
		}
	}
	class SocialMediaPost extends Post{
		constructor(title, content, likes, dislikes){
			super(title, content)
			this.likes = likes
			this.dislikes = dislikes
			this.comments = []
		}
		addComment(comment){
			this.comments.push(comment)
		}
		toString(){
			let output = `${super.toString()}\nRating: ${this.likes - this.dislikes}`;
           if (this.comments.length > 0) {
               output += '\nComments:\n';
               for (let comment of this.comments) {
                   output += ` * ${comment}\n`;
               }
           }
           return output.trim();
		}
	}
	class BlogPost extends Post{
		constructor(title, content, views){
			super(title, content)
			this.views = views
		}
		view(){
			this.views++ //!!!!!!!!!!
			return this //!!!!!!!!!!
		}
		toString(){
			return `${super.toString()}\nViews: ${this.views}`
		}
	}
	return {Post, SocialMediaPost, BlogPost}
}
let result = solve() 
let post = new result.Post("Post", "Content");
console.log(post.toString());

// Post: Post
// Content: Content

let scm = new result.SocialMediaPost("TestTitle", "TestContent", 25, 30);
scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");
console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!

let blogPost = new result.BlogPost("Blog Post", "Content", 2);
blogPost.view()
blogPost.view()
console.log(blogPost.toString());