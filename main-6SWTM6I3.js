import{$ as fe,A as S,B as M,C as v,D as q,E as J,F as Z,G as y,H as K,I as Q,J as X,K as Y,L as ee,M as te,N as ie,O as ne,P as oe,Q as re,R as k,S as ae,T as F,U as le,V as se,W as ce,X as me,Y as de,Z as pe,_ as ue,a as W,b as B,c as G,d as h,e as b,f as x,g as I,h as l,i as _,j as d,k as c,m as g,n as E,o as w,p as o,q as n,r as f,s as L,t as A,u as P,v as u,w as m,x as j,y as R,z as r}from"./chunk-DVIPSAE3.js";var O=class i{constructor(t){this.http=t}apiUrl="https://tecweb-project.duckdns.org";obtenerPeliculaPorId(t){return this.http.get(`${this.apiUrl}/movie/${t}`)}buscarPeliculasPorTitulo(t){return this.http.get(`${this.apiUrl}/search?q=${t}`)}getHeaders(){let t=localStorage.getItem("token");return new X({Authorization:`Bearer ${t}`,"Content-Type":"application/json"})}addToWatchlist(t,e,a=!1){let s=this.getHeaders();return this.http.post(`${this.apiUrl}/watchlist?user_id=${t}&movie_id=${e}&watched=${a}`,{},{headers:s})}getWatchlist(t){let e=this.getHeaders();return this.http.get(`${this.apiUrl}/watchlist?user_id=${t}`,{headers:e})}actualizarWatched(t,e,a){let s=this.getHeaders();return this.http.patch(`${this.apiUrl}/watchlist?user_id=${t}&movie_id=${e}&watched=${a}`,null,{headers:s})}deleteElementWatchList(t,e){let a=this.getHeaders();return this.http.delete(`${this.apiUrl}/watchlist?user_id=${t}&movie_id=${e}`,{headers:a})}static \u0275fac=function(e){return new(e||i)(G(Y))};static \u0275prov=B({token:i,factory:i.\u0275fac,providedIn:"root"})};var Ce=(i,t)=>t.id,be=(i,t)=>t.name;function xe(i,t){i&1&&(o(0,"p"),r(1,"Buscando pel\xEDculas..."),n())}function Se(i,t){if(i&1&&f(0,"img",5),i&2){let e=m().$implicit;c("src","https://image.tmdb.org/t/p/w200"+e.poster_path,I)("alt","P\xF3ster de "+e.title)}}function Pe(i,t){i&1&&(o(0,"span"),r(1,"No disponible"),n())}function Ee(i,t){if(i&1&&(o(0,"span",9),r(1),n()),i&2){let e=t.$implicit;l(),S(e.name)}}function we(i,t){if(i&1&&(o(0,"div",6)(1,"strong"),r(2,"G\xE9neros:"),n(),E(3,Ee,2,1,"span",9,be),n()),i&2){let e=m().$implicit;l(3),w(e.genres)}}function Me(i,t){if(i&1){let e=P();L(0),o(1,"button",10),u("click",function(){b(e);let s=m().$implicit,p=m(3);return x(p.addToWatchlist(s.id))}),r(2," Agregar a Watchlist "),n(),A()}if(i&2){let e=m(4);l(),c("disabled",e.isAddingToWatchlist)}}function ye(i,t){i&1&&(o(0,"span",8),r(1,"\xA1Agregado a la watchlist!"),n())}function ke(i,t){if(i&1&&(o(0,"div",4)(1,"h3"),r(2),n(),d(3,Se,1,2,"img",5)(4,Pe,2,0,"span"),o(5,"p"),r(6),n(),d(7,we,5,0,"div",6)(8,Me,3,1,"ng-container",7)(9,ye,2,0,"span",8),n()),i&2){let e=t.$implicit,a=m(3);l(2),S(e.title),l(),g(e.poster_path?3:4),l(3),S(e.overview),l(),g(e.genres&&e.genres.length>0?7:-1),l(),c("ngIf",a.authService.isAuthenticated()),l(),g(a.additionSuccess[e.id]?9:-1)}}function Fe(i,t){if(i&1&&(o(0,"h2"),r(1,"Resultados de la b\xFAsqueda:"),n(),E(2,ke,10,6,"div",4,Ce)),i&2){let e=m(2);l(2),w(e.movies)}}function Oe(i,t){i&1&&(o(0,"p"),r(1,"No se encontraron pel\xEDculas"),n())}function Ie(i,t){if(i&1&&d(0,Fe,4,0)(1,Oe,2,0,"p"),i&2){let e=m();g(e.movies&&e.movies.length>0?0:1)}}var N=class i{constructor(t,e){this.peliculasService=t;this.authService=e}movies=[];isAddingToWatchlist=!1;additionSuccess={};isSearching=!1;hasSearched=!1;addToWatchlist(t){this.isAddingToWatchlist=!0;let e=this.getCurrentUserId();this.peliculasService.addToWatchlist(e,t).subscribe({next:()=>{this.additionSuccess[t]=!0,setTimeout(()=>{this.additionSuccess[t]=!1},3e3)},error:a=>{console.error("Error adding to watchlist:",a)},complete:()=>{this.isAddingToWatchlist=!1}})}getCurrentUserId(){return JSON.parse(localStorage.getItem("user")||"{}").id}obtenerPeliculas(){this.peliculasService.obtenerPeliculaPorId(2).subscribe(e=>{this.movies=e,console.log("Pel\xEDculas obtenidas:",this.movies)},e=>{console.error("Error al obtener pel\xEDculas:",e)})}buscarPeliculasPorTitulo(t){if(!t){console.error("El t\xEDtulo de la pel\xEDcula no puede estar vac\xEDo");return}this.isSearching=!0,this.hasSearched=!0,this.peliculasService.buscarPeliculasPorTitulo(t).subscribe({next:e=>{this.movies=e,console.log("Pel\xEDculas encontradas:",this.movies)},error:e=>{console.error("Error al buscar pel\xEDculas:",e),this.movies=[]},complete:()=>{this.isSearching=!1}})}static \u0275fac=function(e){return new(e||i)(_(O),_(k))};static \u0275cmp=h({type:i,selectors:[["app-movie-list"]],standalone:!0,features:[v],decls:9,vars:1,consts:[["titleInput",""],["for","title"],["type","text","id","title","placeholder","Escribe el t\xEDtulo de la pel\xEDcula",3,"keydown.enter"],[3,"click"],[1,"movie-card"],[2,"width","100px",3,"src","alt"],[1,"genres"],[4,"ngIf"],[1,"success-message"],[1,"genre-tag"],[1,"watchlist-button",3,"click","disabled"]],template:function(e,a){if(e&1){let s=P();o(0,"div")(1,"label",1),r(2,"Buscar por t\xEDtulo:"),n(),o(3,"input",2,0),u("keydown.enter",function(){b(s);let C=R(4);return x(a.buscarPeliculasPorTitulo(C.value))}),n()(),o(5,"button",3),u("click",function(){b(s);let C=R(4);return x(a.buscarPeliculasPorTitulo(C.value))}),r(6,"Buscar"),n(),d(7,xe,2,0,"p")(8,Ie,2,1)}e&2&&(l(7),g(a.isSearching?7:a.hasSearched?8:-1))},dependencies:[y],styles:[".movie-card[_ngcontent-%COMP%]{border:1px solid #ddd;padding:1rem;margin-bottom:1rem;border-radius:4px}.genre-tag[_ngcontent-%COMP%]{background:#e0e0e0;padding:.2rem .5rem;border-radius:4px;margin-right:.5rem}.watchlist-button[_ngcontent-%COMP%]{background:#3a096f;color:#fff;border:none;padding:.5rem 1rem;border-radius:4px;cursor:pointer;margin-top:1rem}.watchlist-button[_ngcontent-%COMP%]:disabled{background:#ccc}.success-message[_ngcontent-%COMP%]{color:green;margin-left:1rem}body[_ngcontent-%COMP%]{font-family:Arial,sans-serif;background-color:#130728;color:#fff;margin:0;padding:20px}div[_ngcontent-%COMP%]{margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:10px}label[_ngcontent-%COMP%]{font-size:1rem;color:#d1d1d1}input[type=text][_ngcontent-%COMP%]{width:300px;padding:.8rem;background-color:#2a1e4d;color:#fff;border:1px solid #555;border-radius:4px;font-size:1rem;transition:border-color .3s}input[type=text][_ngcontent-%COMP%]:focus{border-color:#7d3cff;outline:none}button[_ngcontent-%COMP%]{padding:.8rem 1.5rem;background-color:#3a096f;color:#fff;font-weight:700;border:none;border-radius:4px;font-size:1rem;cursor:pointer;transition:background-color .3s}button[_ngcontent-%COMP%]:hover{background-color:#491085}h2[_ngcontent-%COMP%]{text-align:center;font-size:1.8rem;margin-bottom:20px}.movie-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.5rem;margin-bottom:10px}.movie-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:4px;margin-bottom:10px}.movie-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;color:#d1d1d1;margin-bottom:10px}.genres[_ngcontent-%COMP%]{margin:10px 0}p[_ngcontent-%COMP%]{text-align:center;font-size:1.2rem;color:#d1d1d1}"]})};var Te=(i,t)=>t.movie_id,Le=(i,t)=>t.id;function Ae(i,t){if(i&1&&f(0,"img",0),i&2){let e=m().$implicit;c("src","https://image.tmdb.org/t/p/w200"+e.poster_path,I)("alt","P\xF3ster de "+e.title)}}function Ne(i,t){i&1&&(o(0,"span"),r(1,"No disponible"),n())}function De(i,t){if(i&1&&f(0,"img",1),i&2){let e=m().$implicit;c("src","https://image.tmdb.org/t/p/w300"+e.backdrop_path,I)("alt","Backdrop de "+e.title)}}function $e(i,t){i&1&&(o(0,"span"),r(1,"No disponible"),n())}function Ue(i,t){if(i&1&&(o(0,"ul")(1,"li"),r(2),n()()),i&2){let e=t.$implicit;l(2),S(e.name)}}function ze(i,t){if(i&1&&E(0,Ue,3,1,"ul",null,Le),i&2){let e=m().$implicit;w(e.genres)}}function Ve(i,t){if(i&1){let e=P();o(0,"tr")(1,"td"),d(2,Ae,1,2,"img",0)(3,Ne,2,0,"span"),n(),o(4,"td"),d(5,De,1,2,"img",1)(6,$e,2,0,"span"),n(),o(7,"td"),r(8),n(),o(9,"td")(10,"div",2)(11,"input",3),u("change",function(){let s=b(e).$implicit,p=m(2);return x(p.actualizarEstadoVisto(s.movie_id,!s.watched))}),n(),o(12,"label",4),r(13),n()()(),o(14,"td"),r(15),n(),o(16,"td"),r(17),q(18,"number"),n(),o(19,"td"),r(20),n(),o(21,"td"),d(22,ze,2,0),n(),o(23,"td")(24,"button",5),u("click",function(){let s=b(e).$implicit,p=m(2);return x(p.eliminarElementoWatchlist(s.movie_id))}),r(25," Eliminar "),n()()()}if(i&2){let e=t.$implicit;l(2),g(e.poster_path?2:3),l(3),g(e.backdrop_path?5:6),l(3),S(e.title),l(3),j("id","watched-",e.movie_id,""),c("checked",e.watched),l(),j("for","watched-",e.movie_id,""),l(),M(" ",e.watched?"Visto":"No visto"," "),l(2),M("",e.runtime," min"),l(2),M("",J(18,13,e.vote_average,"1.1-1"),"/10"),l(3),S(e.release_date),l(2),g(e.genres&&e.genres.length>0?22:-1)}}function He(i,t){if(i&1&&(o(0,"h2"),r(1,"Resultados de la b\xFAsqueda:"),n(),o(2,"table")(3,"thead")(4,"tr")(5,"th"),r(6,"P\xF3ster"),n(),o(7,"th"),r(8,"Backdrop"),n(),o(9,"th"),r(10,"T\xEDtulo"),n(),o(11,"th"),r(12,"Visto"),n(),o(13,"th"),r(14,"Duraci\xF3n"),n(),o(15,"th"),r(16,"Valoraci\xF3n"),n(),o(17,"th"),r(18,"Fecha de lanzamiento"),n(),o(19,"th"),r(20,"G\xE9neros"),n(),o(21,"th"),r(22,"Acciones"),n()()(),o(23,"tbody"),E(24,Ve,26,16,"tr",null,Te),n()()),i&2){let e=m();l(24),w(e.watchList)}}function We(i,t){i&1&&(o(0,"h2"),r(1,"No se encontraron pel\xEDculas"),n())}var $=class i{constructor(t){this.peliculasService=t}ngOnInit(){this.obtenerWatchList(),console.log("xDDDD obtenidas:",this.watchList)}watchList=[];obtenerWatchList(){let t=localStorage.getItem("user");if(t!=null){let e=JSON.parse(t);this.peliculasService.getWatchlist(e.id).subscribe(a=>{this.watchList=a,console.log("Pel\xEDculas obtenidas:",a)},a=>{console.error("Error al obtener pel\xEDculas:",a)})}}actualizarEstadoVisto(t,e){let a=localStorage.getItem("user");if(a!=null){let s=JSON.parse(a);this.peliculasService.actualizarWatched(s.id,t,e).subscribe({next:p=>{console.log("Estado actualizado correctamente:",p);let C=this.watchList.find(H=>H.movie_id===t);C&&(C.watched=e)},error:p=>{console.error("Error al actualizar el estado:",p);let C=this.watchList.find(H=>H.movie_id===t);C&&(C.watched=!e)}})}}eliminarElementoWatchlist(t){let e=localStorage.getItem("user");if(e!=null){let a=JSON.parse(e);this.peliculasService.deleteElementWatchList(a.id,t).subscribe({next:s=>{console.log("Elemento eliminado correctamente:",s),this.watchList=this.watchList.filter(p=>p.movie_id!==t)},error:s=>{console.error("Error al eliminar el elemento:",s)}})}}static \u0275fac=function(e){return new(e||i)(_(O))};static \u0275cmp=h({type:i,selectors:[["app-peliculas"]],standalone:!0,features:[v],decls:2,vars:1,consts:[[2,"width","100px",3,"src","alt"],[2,"width","200px",3,"src","alt"],[1,"watched-toggle"],["type","checkbox",3,"change","checked","id"],[3,"for"],[3,"click"]],template:function(e,a){e&1&&d(0,He,26,0)(1,We,2,0,"h2"),e&2&&g(a.watchList.length>0?0:1)},dependencies:[Q,K,ue],styles:["table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin:20px 0}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px;border:1px solid #ddd;text-align:left}table[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;max-width:100%;height:auto}"]})};function je(i,t){i&1&&(o(0,"div",14),r(1," Los cambios se guardaron correctamente "),n())}function Re(i,t){if(i&1&&(o(0,"div",15),r(1),n()),i&2){let e=m();l(),M(" ",e.updateError," ")}}var U=class i{constructor(t,e,a){this.authService=t;this.fb=e;this.router=a;this.userForm=this.fb.group({username:["",F.required],email:["",[F.required,F.email]]}),this.passwordForm=this.fb.group({currentPassword:["",F.required],newPassword:["",F.required]})}userForm;passwordForm;updateSuccess=!1;updateError="";ngOnInit(){let t=this.authService.currentUser();t&&this.userForm.patchValue({username:t.username,email:t.email})}onUpdateProfile(){if(this.userForm.valid&&this.authService.currentUser()){let t=this.authService.currentUser().id;this.authService.updateUser(t,this.userForm.value).subscribe({next:()=>{this.updateSuccess=!0,this.updateError="";let e=W(W({},this.authService.currentUser()),this.userForm.value);localStorage.setItem("user",JSON.stringify(e)),this.authService.currentUser.set(e)},error:e=>{this.updateError="Error al actualizar el perfil",this.updateSuccess=!1}})}}onUpdatePassword(){if(this.passwordForm.valid&&this.authService.currentUser()){let t=this.authService.currentUser().id;this.authService.updateUser(t,{password:this.passwordForm.value.newPassword}).subscribe({next:()=>{this.updateSuccess=!0,this.updateError="",this.passwordForm.reset()},error:e=>{this.updateError="Error al actualizar la contrase\xF1a",this.updateSuccess=!1}})}}onDeleteAccount(){if(confirm("\xBFEst\xE1s seguro de que deseas eliminar tu cuenta? Esta acci\xF3n no se puede deshacer.")){let t=this.authService.currentUser().id;this.authService.deleteUser(t).subscribe({next:()=>{this.authService.logout(),this.router.navigate(["/login"])},error:e=>{this.updateError="Error al eliminar la cuenta"}})}}static \u0275fac=function(e){return new(e||i)(_(k),_(pe),_(ne))};static \u0275cmp=h({type:i,selectors:[["app-profile"]],standalone:!0,features:[v],decls:32,vars:6,consts:[[1,"profile-container"],[3,"ngSubmit","formGroup"],["for","username"],["type","text","id","username","formControlName","username"],["for","email"],["type","email","id","email","formControlName","email"],["type","submit",3,"disabled"],["for","currentPassword"],["type","password","id","currentPassword","formControlName","currentPassword"],["for","newPassword"],["type","password","id","newPassword","formControlName","newPassword"],["class","success",4,"ngIf"],["class","error",4,"ngIf"],[3,"click"],[1,"success"],[1,"error"]],template:function(e,a){e&1&&(o(0,"div",0)(1,"h2"),r(2,"Perfil de Usuario"),n(),o(3,"form",1),u("ngSubmit",function(){return a.onUpdateProfile()}),o(4,"div")(5,"label",2),r(6,"Nombre de usuario:"),n(),f(7,"input",3),n(),o(8,"div")(9,"label",4),r(10,"Correo electr\xF3nico:"),n(),f(11,"input",5),n(),o(12,"button",6),r(13," Actualizar Perfil "),n()(),o(14,"h3"),r(15,"Cambiar Contrase\xF1a"),n(),o(16,"form",1),u("ngSubmit",function(){return a.onUpdatePassword()}),o(17,"div")(18,"label",7),r(19,"Contrase\xF1a actual:"),n(),f(20,"input",8),n(),o(21,"div")(22,"label",9),r(23,"Nueva contrase\xF1a:"),n(),f(24,"input",10),n(),o(25,"button",6),r(26," Cambiar Contrase\xF1a "),n()(),d(27,je,2,0,"div",11)(28,Re,2,1,"div",12),o(29,"div")(30,"button",13),u("click",function(){return a.onDeleteAccount()}),r(31,"Eliminar Cuenta"),n()()()),e&2&&(l(3),c("formGroup",a.userForm),l(9),c("disabled",!a.userForm.valid),l(4),c("formGroup",a.passwordForm),l(9),c("disabled",!a.passwordForm.valid),l(2),c("ngIf",a.updateSuccess),l(),c("ngIf",a.updateError))},dependencies:[y,fe,ce,ae,le,se,me,de]})};var he=[{path:"buscar-peliculas",component:N},{path:"register",loadComponent:()=>import("./chunk-56IYJWYM.js").then(i=>i.RegisterComponent)},{path:"login",loadComponent:()=>import("./chunk-2CEULHGV.js").then(i=>i.LoginComponent)},{path:"*",redirectTo:"login"},{path:"watchList",component:$},{path:"profile",component:U}];var ve={providers:[Z({eventCoalescing:!0}),re(he),ee()]};function Be(i,t){i&1&&(o(0,"a",10),r(1," Lista de pel\xEDculas "),n())}function Ge(i,t){i&1&&(L(0),o(1,"a",11),r(2," Registrarse "),n(),o(3,"a",12),r(4," Login "),n(),A())}function qe(i,t){i&1&&(o(0,"a",13),r(1," Perfil "),n())}function Je(i,t){if(i&1){let e=P();o(0,"button",14),u("click",function(){b(e);let s=m();return x(s.logout())}),r(1," Logout "),n()}}var z=class i{constructor(t){this.authService=t}logout(){this.authService.logout()}static \u0275fac=function(e){return new(e||i)(_(k))};static \u0275cmp=h({type:i,selectors:[["app-header"]],standalone:!0,features:[v],decls:12,vars:4,consts:[[1,"bg-gray-800","p-4","text-white"],[1,"container","mx-auto","flex","justify-between","items-center"],[1,"nav-left"],["routerLink","/",1,"text-xl","font-bold"],["routerLink","/buscar-peliculas",1,"nav-link"],["routerLink","/watchList","class","nav-link",4,"ngIf"],[1,"nav-right"],[4,"ngIf"],["routerLink","/profile","class","nav-link",4,"ngIf"],["class","text-sm underline",3,"click",4,"ngIf"],["routerLink","/watchList",1,"nav-link"],["routerLink","/register",1,"nav-link"],["routerLink","/login",1,"nav-link"],["routerLink","/profile",1,"nav-link"],[1,"text-sm","underline",3,"click"]],template:function(e,a){e&1&&(o(0,"nav",0)(1,"div",1)(2,"div",2)(3,"a",3),r(4,"Filmoteca"),n(),o(5,"a",4),r(6," Buscar Pel\xEDculas "),n(),d(7,Be,2,0,"a",5),n(),o(8,"div",6),d(9,Ge,5,0,"ng-container",7)(10,qe,2,0,"a",8)(11,Je,2,0,"button",9),n()()()),e&2&&(l(7),c("ngIf",a.authService.isAuthenticated()),l(2),c("ngIf",!a.authService.isAuthenticated()),l(),c("ngIf",a.authService.isAuthenticated()),l(),c("ngIf",a.authService.isAuthenticated()))},dependencies:[oe,y],styles:["a[_ngcontent-%COMP%]{font-family:Georgia,Times New Roman,Times,serif;color:#fff;text-decoration:none;font-size:20px}.nav-left[_ngcontent-%COMP%], .nav-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.brand-logo[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:700;text-decoration:none;color:#fff}.nav-link[_ngcontent-%COMP%]{color:#fff;text-decoration:none;padding:.5rem;transition:color .2s ease}.nav-link[_ngcontent-%COMP%]:hover{color:#d1d5db}"]})};var V=class i{title="frontend";static \u0275fac=function(e){return new(e||i)};static \u0275cmp=h({type:i,selectors:[["app-root"]],standalone:!0,features:[v],decls:3,vars:0,template:function(e,a){e&1&&(o(0,"div"),f(1,"app-header")(2,"router-outlet"),n())},dependencies:[ie,z],styles:["[_nghost-%COMP%]{display:block;margin:0;background-color:#130728}h1[_ngcontent-%COMP%]{text-align:center;font-size:40px;color:#f0f8ff;margin-top:20px;margin-bottom:20px}.nav-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:20px;margin-bottom:30px;padding:0 20px}.nav-left[_ngcontent-%COMP%]{display:flex;gap:20px}.nav-right[_ngcontent-%COMP%]{display:flex;gap:20px;margin-left:40px}.nav-button[_ngcontent-%COMP%]{padding:10px 20px;border:none;border-radius:5px;text-decoration:none;font-size:14px;font-weight:700;transition:background-color .3s,color .3s;cursor:pointer}.nav-button.watchList[_ngcontent-%COMP%]{background-color:#3a096f;color:#fff}.nav-button.watchList[_ngcontent-%COMP%]:hover{background-color:#491085}.nav-button.buscar-peliculas[_ngcontent-%COMP%]{background-color:#3a096f;color:#fff}.nav-button.buscar-peliculas[_ngcontent-%COMP%]:hover{background-color:#491085}.nav-button.register[_ngcontent-%COMP%]{background-color:#3a096f;color:#fff}.nav-button.register[_ngcontent-%COMP%]{background-color:#491085}.nav-button.login[_ngcontent-%COMP%]{background-color:transparent;color:#fff}app-header[_ngcontent-%COMP%]{display:block;height:50px;margin-bottom:30px}router-outlet[_ngcontent-%COMP%]{display:block;margin-top:20px;background-color:#08020b;padding:10px;border-radius:5px;box-shadow:0 0 10px #0000001a;text-align:center;font-size:18px;color:#000}div[_ngcontent-%COMP%]{text-align:center}"]})};te(V,ve).catch(i=>console.error(i));
