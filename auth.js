import {auth,db,ref,set,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "./firebase-config.js";
const $=id=>document.getElementById(id);
function msg(t,ok=false){const x=$("msg");x.textContent=t;x.className="msg show "+(ok?"ok":"error")}
const signup=$("signupForm");
if(signup) signup.addEventListener("submit",async e=>{
 e.preventDefault(); const btn=$("btn"); btn.disabled=true; btn.textContent="Creating...";
 const name=$("name").value.trim(),email=$("email").value.trim(),password=$("password").value;
 try{
  const c=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(c.user,{displayName:name});
  await set(ref(db,"users/"+c.user.uid),{
   uid:c.user.uid,name,email,age:Number($("age").value),heightCm:Number($("height").value),
   weightKg:Number($("weight").value),goal:$("goal").value,
   activityLevel:$("activity").value,workoutPreference:$("workout").value,
   role:"user",createdAt:new Date().toISOString()
  });
  msg("Signup successful. Opening login...",true);
  setTimeout(()=>location.href="login.html",900);
 }catch(e){msg(e.code==="auth/email-already-in-use"?"This email is already registered. Please login.":e.message);btn.disabled=false;btn.textContent="Create Account"}
});
const login=$("loginForm");
if(login) login.addEventListener("submit",async e=>{
 e.preventDefault();const btn=$("btn");btn.disabled=true;btn.textContent="Logging in...";
 try{await signInWithEmailAndPassword(auth,$("email").value.trim(),$("password").value);msg("Login successful. Opening dashboard...",true);setTimeout(()=>location.href="dashboard.html",600)}
 catch(e){msg(e.code==="auth/invalid-credential"?"Email or password is incorrect.":e.message);btn.disabled=false;btn.textContent="Login"}
});
