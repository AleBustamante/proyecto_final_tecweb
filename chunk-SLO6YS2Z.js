import{A as h,B as C,N as x,Q as w,R as _,S as g,T as y,U as N,V as E,W as I,X as L,Y as G,_ as D,c as f,g as o,h as d,i as v,j as u,k as p,l as b,o as r,p as i,q as c,u as F,v as S,y as n}from"./chunk-DD5ML2ZJ.js";function P(l,a){if(l&1&&(r(0,"div",7),n(1),i()),l&2){let t=S();o(),h(" ",t.error," ")}}var A=class l{constructor(a,t,e){this.fb=a;this.authService=t;this.router=e;this.loginForm=this.fb.group({username:["",g.required],password:["",g.required]})}loginForm;error="";onSubmit(){if(this.loginForm.valid){let{username:a,password:t}=this.loginForm.value;this.authService.login(a,t).subscribe({next:()=>{this.router.navigate(["/buscar-peliculas"])},error:e=>{this.error=e.error.message||"Invalid credentials"}})}}static \u0275fac=function(t){return new(t||l)(d(G),d(w),d(x))};static \u0275cmp=f({type:l,selectors:[["app-login"]],standalone:!0,features:[C],decls:15,vars:7,consts:[[1,"container","mx-auto","mt-8","max-w-md"],[1,"text-2xl","font-bold","mb-4"],[1,"space-y-4",3,"ngSubmit","formGroup"],[1,"block","text-sm","font-medium","mb-1"],["type","text","formControlName","username",1,"w-full","p-2","border","rounded"],["type","password","formControlName","password",1,"w-full","p-2","border","rounded"],["type","submit",1,"w-full","bg-blue-500","text-white","p-2","rounded","hover:bg-blue-600","disabled:bg-gray-400",3,"disabled"],[1,"text-red-500","text-sm","mt-2"]],template:function(t,e){if(t&1&&(r(0,"div",0)(1,"h2",1),n(2,"Login"),i(),r(3,"form",2),F("ngSubmit",function(){return e.onSubmit()}),r(4,"div")(5,"label",3),n(6,"Username"),i(),c(7,"input",4),i(),r(8,"div")(9,"label",3),n(10,"Password"),i(),c(11,"input",5),i(),r(12,"button",6),n(13," Login "),i(),v(14,P,2,1,"div",7),i()()),t&2){let m,s;o(3),u("formGroup",e.loginForm),o(4),p("border-red-500",((m=e.loginForm.get("username"))==null?null:m.touched)&&((m=e.loginForm.get("username"))==null?null:m.invalid)),o(4),p("border-red-500",((s=e.loginForm.get("password"))==null?null:s.touched)&&((s=e.loginForm.get("password"))==null?null:s.invalid)),o(),u("disabled",e.loginForm.invalid),o(2),b(e.error?14:-1)}},dependencies:[D,E,_,y,N,I,L]})};export{A as LoginComponent};
