import{_ as P,d as D,u as I,a as M,r as B,b as j,c as N,e as u,f as r,t as c,F as p,w as x,v as y,g as t,h as b,i as w,j as A,k as $,p as q,l as z,m as S,n as T,A as F,o as R,q as n,s as v,x as C,y as W}from"./index.f008daa1.js";const E=m=>(q("data-v-134936fd"),m=m(),z(),m),G={class:"bg",h:"screen",bg:"repeat",display:"flex justify-center items-center"},H={w:"869px",bg:"dark-100",shadow:"main",p:"y-96px x-50px",display:"flex justify-between items-center",border:"2 dark-500"},J=E(()=>r("div",{class:"login-bg",h:"350px",w:"350px",bg:"center no-repeat contain"},null,-1)),K={action:".",display:"flex flex-col",text:"center"},O=E(()=>r("h1",{class:"meta-primary-text",leading:"text",text:"60px",font:"paytone bold"},"MetaWall",-1)),Q={m:"b-9",text:"24px dark-500",font:"helvetica bold"},X={m:"b-4",text:"14px danger"},Y=["disabled","onClick"],Z=S(" \u767B\u5165 "),ee=["disabled","onClick"],ae=S(" \u8A3B\u518A "),te=D({setup(m){const{show:_}=I(),f=T(),l=M(),d=B(!0),g=B(""),e=j({name:"",email:"",password:""}),V={name:{required:v,minLength:C(2)},email:{required:v,email:W},password:{required:v,minLength:C(8)}},o=N(V,e),k=()=>{d.value=!d.value,o.value.$reset(),g.value="",e.name="",e.email="",e.password=""},L=async()=>{try{if(!await o.value.$validate()||!e.name||!e.email||!e.password)throw new Error("\u4E0A\u8FF0\u6B04\u4F4D\u6709\u8AA4\uFF01");const s={name:e.name,email:e.email,password:e.password};await l.signUp(s),await f.push({name:"Post"}),_("\u8A3B\u518A\u3001\u767B\u5165\u6210\u529F\uFF01",F.SUCCESS)}catch(i){g.value=i.message}},U=async()=>{try{const i=await o.value.email.$validate(),s=await o.value.password.$validate();if(!i||!s||!e.email||!e.password)throw new Error("\u4E0A\u8FF0\u6B04\u4F4D\u6709\u8AA4\uFF01");const h={email:e.email,password:e.password};await l.login(h),await f.push({name:"Post"}),_("\u767B\u5165\u6210\u529F\uFF01",F.SUCCESS)}catch(i){g.value=i.message}};return(i,s)=>{const h=R("font-awesome-icon");return n(),u("div",G,[r("div",H,[J,r("div",null,[r("form",K,[O,r("h2",Q,c(d.value?"\u5230\u5143\u5B87\u5B99\u5C55\u958B\u5168\u65B0\u793E\u4EA4\u5708":"\u8A3B\u518A"),1),d.value?w("",!0):(n(),u(p,{key:0},[x(r("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>t(e).name=a),"data-cy":"register-name",type:"text",w:"373px",h:"51px",border:"2 dark-500",m:"b-4",placeholder:"\u66B1\u7A31",onBlur:s[1]||(s[1]=(...a)=>t(o).name.$touch&&t(o).name.$touch(...a))},null,544),[[y,t(e).name]]),(n(!0),u(p,null,b(t(o).name.$errors,a=>(n(),u("span",{key:a.$uid,m:"b-4 -t-2",text:"14px danger left"},c(a.$message),1))),128))],64)),x(r("input",{"onUpdate:modelValue":s[2]||(s[2]=a=>t(e).email=a),"data-cy":"auth-email",type:"text",w:"373px",h:"51px",border:"2 dark-500",m:"b-4",placeholder:"Email",onBlur:s[3]||(s[3]=(...a)=>t(o).email.$touch&&t(o).email.$touch(...a))},null,544),[[y,t(e).email]]),(n(!0),u(p,null,b(t(o).email.$errors,a=>(n(),u("span",{key:a.$uid,"data-cy":"auth-email-error",m:"b-4 -t-2",text:"14px danger left"},c(a.$message),1))),128)),x(r("input",{"onUpdate:modelValue":s[4]||(s[4]=a=>t(e).password=a),"data-cy":"auth-password",type:"password",w:"373px",h:"51px",border:"2 dark-500",m:"b-8",placeholder:"Password",onBlur:s[5]||(s[5]=(...a)=>t(o).password.$touch&&t(o).password.$touch(...a))},null,544),[[y,t(e).password]]),(n(!0),u(p,null,b(t(o).password.$errors,a=>(n(),u("span",{key:a.$uid,m:"b-4 -t-6",text:"14px danger left"},c(a.$message),1))),128)),r("span",X,c(g.value),1),d.value?(n(),u(p,{key:1},[d.value?(n(),u("button",{key:0,class:"meta-primary",transition:"duration-base",type:"submit",p:"y-4",m:"b-4",border:"2 dark-500 rounded-8px",disabled:t(l).loading.auth,onClick:A(U,["prevent"])},[Z,t(l).loading.auth?(n(),$(h,{key:0,icon:["fa","circle-notch"],pulse:"",size:"lg",m:"l-2"})):w("",!0)],8,Y)):w("",!0),r("span",{"data-cy":"toggle-register",cursor:"pointer",text:"center",display:"block",onClick:k}," \u8A3B\u518A\u5E33\u865F ")],64)):(n(),u(p,{key:2},[r("button",{type:"submit","data-cy":"register-btn",class:"meta-primary",transition:"duration-base",p:"y-4",m:"b-4",border:"2 dark-500 rounded-8px",disabled:t(l).loading.auth,onClick:A(L,["prevent"])},[ae,t(l).loading.auth?(n(),$(h,{key:0,icon:["fa","circle-notch"],pulse:"",size:"lg",m:"l-2"})):w("",!0)],8,ee),r("span",{cursor:"pointer",text:"center",display:"block",onClick:k}," \u767B\u5165 ")],64))])])])])}}});var oe=P(te,[["__scopeId","data-v-134936fd"]]);export{oe as default};