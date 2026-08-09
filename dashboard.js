import {auth,db,ref,get,signOut,onAuthStateChanged} from "./firebase-config.js";
const $=id=>document.getElementById(id);
let userData=null,done=[false,false,false,false];
function page(id,label,btn){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active-page"));$(id).classList.add("active-page");$("title").textContent=label;document.querySelectorAll(".nav button").forEach(x=>x.classList.remove("active"));btn.classList.add("active")}
document.querySelectorAll(".nav button").forEach(b=>b.onclick=()=>page(b.dataset.page,b.textContent,b));
document.querySelectorAll(".habit").forEach(b=>b.onclick=()=>{done[Number(b.dataset.h)]=!done[Number(b.dataset.h)];b.textContent=done[Number(b.dataset.h)]?"Completed":"Mark done";update()});
function update(){let n=done.filter(Boolean).length;$("progress").textContent=n+"/4";$("habitCount").textContent=n+"/4"}
onAuthStateChanged(auth,async u=>{
 if(!u){location.replace("login.html");return}
 $("userName").textContent=u.displayName||"User";$("avatar").textContent=(u.displayName||"U")[0].toUpperCase();
 const s=await get(ref(db,"users/"+u.uid));userData=s.val()||{};
 $("profileData").innerHTML=`<b>Name:</b> ${userData.name||"—"}<br><b>Email:</b> ${userData.email||"—"}<br><b>Age:</b> ${userData.age||"—"}<br><b>Height:</b> ${userData.heightCm||"—"} cm<br><b>Weight:</b> ${userData.weightKg||"—"} kg<br><b>Goal:</b> ${userData.goal||"—"}<br><b>Activity:</b> ${userData.activityLevel||"—"}<br><b>Workout:</b> ${userData.workoutPreference||"—"}`;
});
$("logout").onclick=async()=>{await signOut(auth);location.replace("login.html")};
const replies={
"water":"Try to drink water regularly throughout the day and keep a bottle nearby.",
"sleep":"A consistent sleep and wake schedule can make your routine easier to maintain.",
"workout":"Choose comfortable, age-appropriate movement and build consistency gradually.",
"food":"Aim for a varied diet with regular meals and a mix of nutritious foods.",
"meal":"Regular, balanced meals can help support your daily energy and routine.",
"routine":"Your routine has three simple anchors: regular meals, hydration, and daily movement.",
"weight":"I can provide general healthy-habit information, but I can't create individualized weight-loss prescriptions."
};
$("chatForm").onsubmit=e=>{e.preventDefault();let q=$("chatInput").value.trim();if(!q)return;add("me",q);let k=Object.keys(replies).find(x=>q.toLowerCase().includes(x));setTimeout(()=>add("bot",replies[k]||"I can help with general nutrition, movement, hydration, sleep, habits, and your app routine. For medical questions, please speak with a qualified professional."),350);$("chatInput").value=""};
function add(c,t){let d=document.createElement("div");d.className="bubble "+c;d.textContent=t;$("messages").appendChild(d);$("messages").scrollTop=$("messages").scrollHeight}
