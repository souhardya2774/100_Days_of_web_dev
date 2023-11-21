const loadCommentsButton=document.getElementById("load-comments-btn");
const commentsSection=document.getElementById("comments");
const commentsFormElement=document.querySelector("#comments-form form");
const newCommentTitleElement=document.getElementById("title");
const newCommentTextElement=document.getElementById("text");


const createComentsList=(comments)=>{
    const olElement=document.createElement("ol");
    for(const comment of comments){
        const commentElement=document.createElement("li");
        commentElement.innerHTML=`
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;
        olElement.appendChild(commentElement);
    }
    return olElement;
};

const fetchCommentList=async (event)=>{
    const postId=loadCommentsButton.dataset.postid;
    try {
        const response=await fetch(`/posts/${postId}/comments`);
        const responseData=await response.json();
        if(!responseData || responseData.length==0){
            commentsSection.firstElementChild.textContent="No comment found! May be add some!";
            return;
        }
        const listElement=createComentsList(responseData);
        commentsSection.innerHTML="";
        commentsSection.appendChild(listElement);
    } catch (error) {
        alert("Not working!");
    }
};

loadCommentsButton.addEventListener("click",fetchCommentList);
commentsFormElement.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const postId=commentsFormElement.dataset.postid;

    const comment={
        title:newCommentTitleElement.value,
        text:newCommentTextElement.value
    };
    try {
        const response=await fetch(`/posts/${postId}/comments`,{
            method:"POST",
            body:JSON.stringify(comment),
            headers:{
                "Content-Type":"application/json"
            }
        });
    
        if(response.ok){
            fetchCommentList();
        }else{
            alert("Couldn't send the comment!");
        }
    } catch (error) {
        alert("Something goes wrong, Try later!");
    }
    newCommentTitleElement.value="";
    newCommentTextElement.value="";
});