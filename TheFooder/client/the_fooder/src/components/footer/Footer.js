import { Link } from "react-router-dom"
import { NavLink } from "reactstrap"
import "./Footer.css"

export const WelcomeFooter = () => {

    return (
        <>
            <footer className="footer">
                <article className="footer-links">
                    <section className="footer-items">
                        <nav className="footer-features">&nbsp;&nbsp;&nbsp;&nbsp; <div className="font"><b>Popular Features</b></div>
                            <Link id="footer__link" to="/recipe/create">Create a Recipe </Link>
                            <Link id="footer__link" to="/userProfile">My Profile View</Link>
                            {/* <Link className="footer__link" to="/profile/:customerId">Recipe Search</Link> */}
                        </nav>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

                        <nav className="footer-features">&nbsp;&nbsp;&nbsp;&nbsp; <div className="font">
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Contact & Info </b></div>
                            <div className="modals">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* <About/> &nbsp;&nbsp;&nbsp;&nbsp; */}
                                {/* <Contact/> */}
                            </div>
                        </nav>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        <nav className="footer-resources">&nbsp;&nbsp;&nbsp;&nbsp; <div className="font"><b>Helpful Resources</b></div>
                            <NavLink id="footer__link" href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet">
                                Healthy Nutrition</NavLink>
                            <NavLink id="footer__link" href="https://ice.edu/newyork/free-online-cooking-classes">
                                Learn about Cooking</NavLink>
                        </nav>
                    </section>

                    <div className="copyright">
                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                       <div>
                        <a href='https://twitter.com/'><img alt="" className="twit__flogo" src="http://powerpackedventures.in/wp-content/uploads/2022/05/Asset-1@4x.png" width="45" height="35"></img></a>
                        <a href='https://www.snapchat.com/'><img alt="" className="snap__flogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxW5tD8WNeXeScnfk_D6nxjaPuEW-NVfIczYEH3KWmnw0vkkpfBG0rHZRJGzzZBebgCE&usqp=CAU" width="40" height="35"></img></a>
                        <a href='https://www.facebook.com/'><img alt="" className="fb__flogo" src="https://i.pinimg.com/originals/79/ff/98/79ff98c829c7f91b891cfc9555ebade2.png" width="50" height="45"></img></a>
                        <a href='https://www.instagram.com/'><img alt="" className="insta__flogo" src="https://i.pinimg.com/originals/63/9b/3d/639b3dafb544d6f061fcddd2d6686ddb.png" width="45" height="35"></img></a>
                        </div>
                        ©2022 The Fooder Inc., All Rights Reserved
                    </div>
                </article>
            </footer>
        </>
    )
}