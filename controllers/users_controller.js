// users_controller
// module.exports.action = function(request,response){
//     // return response.end('<h1>Express is up for Codeial - Users Controllers</h1>')
    
// }

const LocalStrategy = require("../config/passport-local-strategy");
const users = require('../models/user')

module.exports.profile = (req, res)=>{
    return res.render('user_profile', {
        title: 'User Profile'
    });
};

// Render the Sign Up page
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    //ToDo - Check if user is already signed in or not
    return res.render('user_sign_up',{
        title:"Codeial" | "SignUp"
    });
};

// Render the Sign In page
module.exports.signIn =async (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    //ToDo - Check if user is already signed in or not
    return res.render('user_sign_in',{
        title:"Codeial-SignIn"
    });
};

// module.exports.signOut =async (req,res)=>{
//     if(req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     //ToDo - Check if user is already signed in or not
//     return res.render('user_sign_in',{
//         title:"Codeial-SignIn"
//     });
// };

// Get the sign up data
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        let user = await users.findOne({email:req.body.email});
        try {
            if(!user){
                await users.create(req.body);
                //OR
                // await users.insertMany({
                //     email:req.body.email,
                //     password:req.body.password,
                //     name:req.body.name 
                // });

                console.log("New user's account created")
                return res.redirect('/users/sign-in');
            }
            else{
                console.log("Account already exist ")
                return res.redirect('back');
            }
        } catch (error) {
            console.log("Error in finding user in DB");
        }
    } catch (error) {
        console.log("Error in finding user in DB");
        return;
    }

}

module.exports.createSession =function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { 
            console.log(err);
            return; 
        }
        return res.redirect('/');
    });
}