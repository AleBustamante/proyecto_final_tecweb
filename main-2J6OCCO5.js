import{$ as fe,A as P,B as O,C as b,D as q,E as J,F as Y,G as E,H as Z,I as K,J as Q,K as X,L as ee,M as te,N as ne,O as ie,P as oe,Q as re,R as y,S as ae,T as k,U as le,V as ce,W as se,X as de,Y as me,Z as pe,_ as ue,a as j,b as B,c as G,d as h,e as C,f as v,g as I,h as l,i as g,j as m,k as s,m as _,n as S,o as w,p as o,q as i,r as f,s as L,t as z,u as M,v as u,w as d,x as W,y as R,z as r}from"./chunk-DVIPSAE3.js";var F=class n{constructor(t){this.http=t}apiUrl="https://tecweb-project.duckdns.org";obtenerPeliculaPorId(t){return this.http.get(`${this.apiUrl}/movie/${t}`)}buscarPeliculasPorTitulo(t){return this.http.get(`${this.apiUrl}/search?q=${t}`)}getHeaders(){let t=localStorage.getItem("token");return new Q({Authorization:`Bearer ${t}`,"Content-Type":"application/json"})}addToWatchlist(t,e,a=!1){let c=this.getHeaders();return this.http.post(`${this.apiUrl}/watchlist?user_id=${t}&movie_id=${e}&watched=${a}`,{},{headers:c})}getWatchlist(t){let e=this.getHeaders();return this.http.get(`${this.apiUrl}/watchlist?user_id=${t}`,{headers:e})}actualizarWatched(t,e,a){let c=this.getHeaders();return this.http.patch(`${this.apiUrl}/watchlist?user_id=${t}&movie_id=${e}&watched=${a}`,null,{headers:c})}deleteElementWatchList(t,e){let a=this.getHeaders();return this.http.delete(`${this.apiUrl}/watchlist?user_id=${t}&movie_id=${e}`,{headers:a})}static \u0275fac=function(e){return new(e||n)(G(X))};static \u0275prov=B({token:n,factory:n.\u0275fac,providedIn:"root"})};var xe=(n,t)=>t.id,Ce=(n,t)=>t.name;function ve(n,t){n&1&&(o(0,"p"),r(1,"Buscando pel\xEDculas..."),i())}function Pe(n,t){if(n&1&&f(0,"img",5),n&2){let e=d().$implicit;s("src","https://image.tmdb.org/t/p/w200"+e.poster_path,I)("alt","P\xF3ster de "+e.title)}}function Me(n,t){n&1&&(o(0,"span"),r(1,"No disponible"),i())}function Se(n,t){if(n&1&&(o(0,"span",9),r(1),i()),n&2){let e=t.$implicit;l(),P(e.name)}}function we(n,t){if(n&1&&(o(0,"div",6)(1,"strong"),r(2,"G\xE9neros:"),i(),S(3,Se,2,1,"span",9,Ce),i()),n&2){let e=d().$implicit;l(3),w(e.genres)}}function Oe(n,t){if(n&1){let e=M();L(0),o(1,"button",10),u("click",function(){C(e);let c=d().$implicit,p=d(3);return v(p.addToWatchlist(c.id))}),r(2," Agregar a Watchlist "),i(),z()}if(n&2){let e=d(4);l(),s("disabled",e.isAddingToWatchlist)}}function Ee(n,t){n&1&&(o(0,"span",8),r(1,"\xA1Agregado a la watchlist!"),i())}function ye(n,t){if(n&1&&(o(0,"div",4)(1,"h3"),r(2),i(),m(3,Pe,1,2,"img",5)(4,Me,2,0,"span"),o(5,"p"),r(6),i(),m(7,we,5,0,"div",6)(8,Oe,3,1,"ng-container",7)(9,Ee,2,0,"span",8),i()),n&2){let e=t.$implicit,a=d(3);l(2),P(e.title),l(),_(e.poster_path?3:4),l(3),P(e.overview),l(),_(e.genres&&e.genres.length>0?7:-1),l(),s("ngIf",a.authService.isAuthenticated()),l(),_(a.additionSuccess[e.id]?9:-1)}}function ke(n,t){if(n&1&&(o(0,"h2"),r(1,"Resultados de la b\xFAsqueda:"),i(),S(2,ye,10,6,"div",4,xe)),n&2){let e=d(2);l(2),w(e.movies)}}function Fe(n,t){n&1&&(o(0,"p"),r(1,"No se encontraron pel\xEDculas"),i())}function Ie(n,t){if(n&1&&m(0,ke,4,0)(1,Fe,2,0,"p"),n&2){let e=d();_(e.movies&&e.movies.length>0?0:1)}}var A=class n{constructor(t,e){this.peliculasService=t;this.authService=e}movies=[];isAddingToWatchlist=!1;additionSuccess={};isSearching=!1;hasSearched=!1;addToWatchlist(t){this.isAddingToWatchlist=!0;let e=this.getCurrentUserId();this.peliculasService.addToWatchlist(e,t).subscribe({next:()=>{this.additionSuccess[t]=!0,setTimeout(()=>{this.additionSuccess[t]=!1},3e3)},error:a=>{console.error("Error adding to watchlist:",a)},complete:()=>{this.isAddingToWatchlist=!1}})}getCurrentUserId(){return JSON.parse(localStorage.getItem("user")||"{}").id}obtenerPeliculas(){this.peliculasService.obtenerPeliculaPorId(2).subscribe(e=>{this.movies=e,console.log("Pel\xEDculas obtenidas:",this.movies)},e=>{console.error("Error al obtener pel\xEDculas:",e)})}buscarPeliculasPorTitulo(t){if(!t){console.error("El t\xEDtulo de la pel\xEDcula no puede estar vac\xEDo");return}this.isSearching=!0,this.hasSearched=!0,this.peliculasService.buscarPeliculasPorTitulo(t).subscribe({next:e=>{this.movies=e,console.log("Pel\xEDculas encontradas:",this.movies)},error:e=>{console.error("Error al buscar pel\xEDculas:",e),this.movies=[]},complete:()=>{this.isSearching=!1}})}static \u0275fac=function(e){return new(e||n)(g(F),g(y))};static \u0275cmp=h({type:n,selectors:[["app-movie-list"]],standalone:!0,features:[b],decls:9,vars:1,consts:[["titleInput",""],["for","title"],["type","text","id","title","placeholder","Escribe el t\xEDtulo de la pel\xEDcula",3,"keydown.enter"],[3,"click"],[1,"movie-card"],[2,"width","100px",3,"src","alt"],[1,"genres"],[4,"ngIf"],[1,"success-message"],[1,"genre-tag"],[1,"watchlist-button",3,"click","disabled"]],template:function(e,a){if(e&1){let c=M();o(0,"div")(1,"label",1),r(2,"Buscar por t\xEDtulo:"),i(),o(3,"input",2,0),u("keydown.enter",function(){C(c);let x=R(4);return v(a.buscarPeliculasPorTitulo(x.value))}),i()(),o(5,"button",3),u("click",function(){C(c);let x=R(4);return v(a.buscarPeliculasPorTitulo(x.value))}),r(6,"Buscar"),i(),m(7,ve,2,0,"p")(8,Ie,2,1)}e&2&&(l(7),_(a.isSearching?7:a.hasSearched?8:-1))},dependencies:[E],styles:[".movie-card[_ngcontent-%COMP%]{border:1px solid #555;background-color:#2a1e4d;padding:1rem;margin-bottom:1rem;border-radius:4px;color:#f0f0f0}.genre-tag[_ngcontent-%COMP%]{background:#491085;color:#fff;padding:.2rem .5rem;border-radius:4px;margin-right:.5rem;font-size:.9rem;text-transform:capitalize}.watchlist-button[_ngcontent-%COMP%]{background:#7d3cff;color:#fff;border:none;padding:.5rem 1rem;border-radius:4px;cursor:pointer;margin-top:1rem;font-size:1rem;font-weight:600;transition:background-color .3s,transform .2s}.watchlist-button[_ngcontent-%COMP%]:hover{background:#9e67ff;transform:translateY(-2px)}.watchlist-button[_ngcontent-%COMP%]:disabled{background:#555;color:#aaa;cursor:not-allowed}.success-message[_ngcontent-%COMP%]{color:#00ff8c;margin-left:1rem;font-size:.9rem}body[_ngcontent-%COMP%]{font-family:Poppins,Arial,sans-serif;background-color:#130728;color:#fff;margin:0;padding:20px}div[_ngcontent-%COMP%]{margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:10px}label[_ngcontent-%COMP%]{font-size:1rem;color:#d1d1d1;text-transform:capitalize;font-family:Arial,sans-serif}input[type=text][_ngcontent-%COMP%]{width:300px;padding:.8rem;background-color:#2a1e4d;color:#f0f0f0;border:1px solid #555;border-radius:4px;font-size:1rem;transition:border-color .3s,box-shadow .3s}input[type=text][_ngcontent-%COMP%]:focus{border-color:#7d3cff;box-shadow:0 0 5px #7d3cff;outline:none}button[_ngcontent-%COMP%]{padding:.8rem 1.5rem;background-color:#3a096f;color:#f0f0f0;font-weight:700;border:none;border-radius:4px;font-size:1rem;font-family:Arial,sans-serif;cursor:pointer;transition:background-color .3s,transform .2s}button[_ngcontent-%COMP%]:hover{background-color:#9e67ff;transform:translateY(-2px)}h2[_ngcontent-%COMP%]{text-align:center;font-size:1.8rem;margin-bottom:20px;color:#f5ea14;text-transform:uppercase;letter-spacing:1px}.movie-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.4rem;margin-bottom:10px;color:#f0f0f0}.movie-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:4px;margin-bottom:10px;box-shadow:0 2px 5px #00000080}.movie-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;color:#d1d1d1;margin-bottom:10px}.genres[_ngcontent-%COMP%]{margin:10px 0}p[_ngcontent-%COMP%]{text-align:center;font-size:1.1rem;color:#d1d1d1;margin:10px 0;font-family:Arial,sans-serif}@media (max-width: 768px){div[_ngcontent-%COMP%]{flex-direction:column;gap:15px}input[type=text][_ngcontent-%COMP%]{width:90%;font-size:.9rem;padding:.7rem}button[_ngcontent-%COMP%]{width:90%;font-size:1rem;padding:.7rem 1rem}h2[_ngcontent-%COMP%]{font-size:1.5rem}.movie-card[_ngcontent-%COMP%]{padding:.8rem;font-size:.9rem}.movie-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px}.watchlist-button[_ngcontent-%COMP%]{font-size:.9rem;padding:.5rem 1rem}}"]})};var Te=(n,t)=>t.movie_id,Le=(n,t)=>t.id;function ze(n,t){if(n&1&&f(0,"img",0),n&2){let e=d().$implicit;s("src","https://image.tmdb.org/t/p/w200"+e.poster_path,I)("alt","P\xF3ster de "+e.title)}}function Ae(n,t){n&1&&(o(0,"span"),r(1,"No disponible"),i())}function Ne(n,t){if(n&1&&f(0,"img",1),n&2){let e=d().$implicit;s("src","https://image.tmdb.org/t/p/w300"+e.backdrop_path,I)("alt","Backdrop de "+e.title)}}function De(n,t){n&1&&(o(0,"span"),r(1,"No disponible"),i())}function $e(n,t){if(n&1&&(o(0,"ul")(1,"li"),r(2),i()()),n&2){let e=t.$implicit;l(2),P(e.name)}}function Ue(n,t){if(n&1&&S(0,$e,3,1,"ul",null,Le),n&2){let e=d().$implicit;w(e.genres)}}function Ve(n,t){if(n&1){let e=M();o(0,"tr")(1,"td"),m(2,ze,1,2,"img",0)(3,Ae,2,0,"span"),i(),o(4,"td"),m(5,Ne,1,2,"img",1)(6,De,2,0,"span"),i(),o(7,"td"),r(8),i(),o(9,"td")(10,"div",2)(11,"input",3),u("change",function(){let c=C(e).$implicit,p=d(2);return v(p.actualizarEstadoVisto(c.movie_id,!c.watched))}),i(),o(12,"label",4),r(13),i()()(),o(14,"td"),r(15),i(),o(16,"td"),r(17),q(18,"number"),i(),o(19,"td"),r(20),i(),o(21,"td"),m(22,Ue,2,0),i(),o(23,"td")(24,"button",5),u("click",function(){let c=C(e).$implicit,p=d(2);return v(p.eliminarElementoWatchlist(c.movie_id))}),r(25," Eliminar "),i()()()}if(n&2){let e=t.$implicit;l(2),_(e.poster_path?2:3),l(3),_(e.backdrop_path?5:6),l(3),P(e.title),l(3),W("id","watched-",e.movie_id,""),s("checked",e.watched),l(),W("for","watched-",e.movie_id,""),l(),O(" ",e.watched?"Visto":"No visto"," "),l(2),O("",e.runtime," min"),l(2),O("",J(18,13,e.vote_average,"1.1-1"),"/10"),l(3),P(e.release_date),l(2),_(e.genres&&e.genres.length>0?22:-1)}}function He(n,t){if(n&1&&(o(0,"h2"),r(1,"Resultados de la b\xFAsqueda:"),i(),o(2,"table")(3,"thead")(4,"tr")(5,"th"),r(6,"P\xF3ster"),i(),o(7,"th"),r(8,"Backdrop"),i(),o(9,"th"),r(10,"T\xEDtulo"),i(),o(11,"th"),r(12,"Visto"),i(),o(13,"th"),r(14,"Duraci\xF3n"),i(),o(15,"th"),r(16,"Valoraci\xF3n"),i(),o(17,"th"),r(18,"Fecha de lanzamiento"),i(),o(19,"th"),r(20,"G\xE9neros"),i(),o(21,"th"),r(22,"Acciones"),i()()(),o(23,"tbody"),S(24,Ve,26,16,"tr",null,Te),i()()),n&2){let e=d();l(24),w(e.watchList)}}function je(n,t){n&1&&(o(0,"h2"),r(1,"No se encontraron pel\xEDculas"),i())}var D=class n{constructor(t){this.peliculasService=t}ngOnInit(){this.obtenerWatchList(),console.log("xDDDD obtenidas:",this.watchList)}watchList=[];obtenerWatchList(){let t=localStorage.getItem("user");if(t!=null){let e=JSON.parse(t);this.peliculasService.getWatchlist(e.id).subscribe(a=>{this.watchList=a,console.log("Pel\xEDculas obtenidas:",a)},a=>{console.error("Error al obtener pel\xEDculas:",a)})}}actualizarEstadoVisto(t,e){let a=localStorage.getItem("user");if(a!=null){let c=JSON.parse(a);this.peliculasService.actualizarWatched(c.id,t,e).subscribe({next:p=>{console.log("Estado actualizado correctamente:",p);let x=this.watchList.find(H=>H.movie_id===t);x&&(x.watched=e)},error:p=>{console.error("Error al actualizar el estado:",p);let x=this.watchList.find(H=>H.movie_id===t);x&&(x.watched=!e)}})}}eliminarElementoWatchlist(t){let e=localStorage.getItem("user");if(e!=null){let a=JSON.parse(e);this.peliculasService.deleteElementWatchList(a.id,t).subscribe({next:c=>{console.log("Elemento eliminado correctamente:",c),this.watchList=this.watchList.filter(p=>p.movie_id!==t)},error:c=>{console.error("Error al eliminar el elemento:",c)}})}}static \u0275fac=function(e){return new(e||n)(g(F))};static \u0275cmp=h({type:n,selectors:[["app-peliculas"]],standalone:!0,features:[b],decls:2,vars:1,consts:[[2,"width","100px",3,"src","alt"],[2,"width","200px",3,"src","alt"],[1,"watched-toggle"],["type","checkbox",3,"change","checked","id"],[3,"for"],[3,"click"]],template:function(e,a){e&1&&m(0,He,26,0)(1,je,2,0,"h2"),e&2&&_(a.watchList.length>0?0:1)},dependencies:[K,Z,ue],styles:["[_nghost-%COMP%]{font-family:Poppins,Arial,sans-serif;background-color:#130728;color:#fff;margin:0;padding:20px}h2[_ngcontent-%COMP%]{text-align:center;font-size:1.8rem;color:#f5ea14;text-transform:uppercase;margin-bottom:20px}table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin:20px 0;background-color:#2a1e4d;border:1px solid #555;border-radius:6px;overflow:hidden;box-shadow:0 4px 8px #0006}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{padding:1rem;text-align:center;color:#d1d1d1;border-bottom:1px solid #444}th[_ngcontent-%COMP%]{background-color:#491085;color:#fff;font-weight:700;text-transform:uppercase}tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#33255a}tr[_ngcontent-%COMP%]:hover{background-color:#3f2e68;transition:background-color .3s ease}td[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 2px 4px #00000080}.watched-toggle[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:5px}.watched-toggle[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{accent-color:#7d3cff;transform:scale(1.2);cursor:pointer}.watched-toggle[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:.9rem;color:#f0f0f0;text-transform:capitalize}button[_ngcontent-%COMP%]{padding:.5rem 1rem;background-color:#7d3cff;color:#f0f0f0;border:none;border-radius:4px;font-weight:700;cursor:pointer;font-size:1rem;transition:background-color .3s,transform .2s}button[_ngcontent-%COMP%]:hover{background-color:#9e67ff;transform:translateY(-2px)}button[_ngcontent-%COMP%]:active{transform:translateY(0)}td[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding:0;list-style-type:none;margin:0}td[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block;margin:0 5px;background:#491085;color:#fff;padding:.2rem .5rem;border-radius:4px;font-size:.8rem;text-transform:capitalize}@media (max-width: 768px){table[_ngcontent-%COMP%], thead[_ngcontent-%COMP%], tbody[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%], tr[_ngcontent-%COMP%]{display:block}thead[_ngcontent-%COMP%]{display:none}tr[_ngcontent-%COMP%]{margin-bottom:10px;background-color:#33255a;border:1px solid #555;border-radius:6px;box-shadow:0 2px 4px #0000004d}td[_ngcontent-%COMP%]{text-align:left;padding:.5rem;display:flex;justify-content:space-between;gap:10px}td[_ngcontent-%COMP%]:before{content:attr(data-label);font-weight:700;color:#f5ea14}td[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;margin:0 auto}}"]})};function We(n,t){n&1&&(o(0,"div",14),r(1," Los cambios se guardaron correctamente "),i())}function Re(n,t){if(n&1&&(o(0,"div",15),r(1),i()),n&2){let e=d();l(),O(" ",e.updateError," ")}}var $=class n{constructor(t,e,a){this.authService=t;this.fb=e;this.router=a;this.userForm=this.fb.group({username:["",k.required],email:["",[k.required,k.email]]}),this.passwordForm=this.fb.group({currentPassword:["",k.required],newPassword:["",k.required]})}userForm;passwordForm;updateSuccess=!1;updateError="";ngOnInit(){let t=this.authService.currentUser();t&&this.userForm.patchValue({username:t.username,email:t.email})}onUpdateProfile(){if(this.userForm.valid&&this.authService.currentUser()){let t=this.authService.currentUser().id;this.authService.updateUser(t,this.userForm.value).subscribe({next:()=>{this.updateSuccess=!0,this.updateError="";let e=j(j({},this.authService.currentUser()),this.userForm.value);localStorage.setItem("user",JSON.stringify(e)),this.authService.currentUser.set(e)},error:e=>{this.updateError="Error al actualizar el perfil",this.updateSuccess=!1}})}}onUpdatePassword(){if(this.passwordForm.valid&&this.authService.currentUser()){let t=this.authService.currentUser().id;this.authService.updateUser(t,{password:this.passwordForm.value.newPassword}).subscribe({next:()=>{this.updateSuccess=!0,this.updateError="",this.passwordForm.reset()},error:e=>{this.updateError="Error al actualizar la contrase\xF1a",this.updateSuccess=!1}})}}onDeleteAccount(){if(confirm("\xBFEst\xE1s seguro de que deseas eliminar tu cuenta? Esta acci\xF3n no se puede deshacer.")){let t=this.authService.currentUser().id;this.authService.deleteUser(t).subscribe({next:()=>{this.authService.logout(),this.router.navigate(["/login"])},error:e=>{this.updateError="Error al eliminar la cuenta"}})}}static \u0275fac=function(e){return new(e||n)(g(y),g(pe),g(ie))};static \u0275cmp=h({type:n,selectors:[["app-profile"]],standalone:!0,features:[b],decls:32,vars:6,consts:[[1,"profile-container"],[3,"ngSubmit","formGroup"],["for","username"],["type","text","id","username","formControlName","username"],["for","email"],["type","email","id","email","formControlName","email"],["type","submit",3,"disabled"],["for","currentPassword"],["type","password","id","currentPassword","formControlName","currentPassword"],["for","newPassword"],["type","password","id","newPassword","formControlName","newPassword"],["class","success",4,"ngIf"],["class","error",4,"ngIf"],[3,"click"],[1,"success"],[1,"error"]],template:function(e,a){e&1&&(o(0,"div",0)(1,"h2"),r(2,"Perfil de Usuario"),i(),o(3,"form",1),u("ngSubmit",function(){return a.onUpdateProfile()}),o(4,"div")(5,"label",2),r(6,"Nombre de usuario:"),i(),f(7,"input",3),i(),o(8,"div")(9,"label",4),r(10,"Correo electr\xF3nico:"),i(),f(11,"input",5),i(),o(12,"button",6),r(13," Actualizar Perfil "),i()(),o(14,"h3"),r(15,"Cambiar Contrase\xF1a"),i(),o(16,"form",1),u("ngSubmit",function(){return a.onUpdatePassword()}),o(17,"div")(18,"label",7),r(19,"Contrase\xF1a actual:"),i(),f(20,"input",8),i(),o(21,"div")(22,"label",9),r(23,"Nueva contrase\xF1a:"),i(),f(24,"input",10),i(),o(25,"button",6),r(26," Cambiar Contrase\xF1a "),i()(),m(27,We,2,0,"div",11)(28,Re,2,1,"div",12),o(29,"div")(30,"button",13),u("click",function(){return a.onDeleteAccount()}),r(31,"Eliminar Cuenta"),i()()()),e&2&&(l(3),s("formGroup",a.userForm),l(9),s("disabled",!a.userForm.valid),l(4),s("formGroup",a.passwordForm),l(9),s("disabled",!a.passwordForm.valid),l(2),s("ngIf",a.updateSuccess),l(),s("ngIf",a.updateError))},dependencies:[E,fe,se,ae,le,ce,de,me],styles:["[_nghost-%COMP%]{font-family:Poppins,Arial,sans-serif;background-color:#130728;color:#fff;padding:20px;display:flex;justify-content:center;align-items:center;min-height:100vh}.profile-container[_ngcontent-%COMP%]{width:100%;max-width:600px;background-color:#2a1e4d;padding:2rem;border-radius:8px;box-shadow:0 4px 8px #0006}.profile-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .profile-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;margin-bottom:1rem;color:#f5ea14;text-transform:uppercase;letter-spacing:1px}form[_ngcontent-%COMP%]{margin-bottom:2rem}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:1rem}label[_ngcontent-%COMP%]{font-size:1rem;margin-bottom:.5rem;color:#d1d1d1}input[_ngcontent-%COMP%]{padding:.8rem;background-color:#3b306a;color:#f0f0f0;border:1px solid #555;border-radius:4px;font-size:1rem;transition:border-color .3s,box-shadow .3s}input[_ngcontent-%COMP%]:focus{border-color:#7d3cff;box-shadow:0 0 5px #7d3cff;outline:none}button[_ngcontent-%COMP%]{padding:.8rem 1.5rem;background-color:#7d3cff;color:#f0f0f0;font-weight:700;border:none;border-radius:4px;font-size:1rem;cursor:pointer;transition:background-color .3s,transform .2s;width:100%}button[_ngcontent-%COMP%]:hover{background-color:#9e67ff;transform:translateY(-2px)}button[_ngcontent-%COMP%]:disabled{background-color:#555;color:#aaa;cursor:not-allowed}.success[_ngcontent-%COMP%]{background-color:#28a745;color:#fff;padding:.8rem;margin-bottom:1rem;border-radius:4px;text-align:center}.error[_ngcontent-%COMP%]{background-color:#dc3545;color:#fff;padding:.8rem;margin-bottom:1rem;border-radius:4px;text-align:center}@media (max-width: 768px){.profile-container[_ngcontent-%COMP%]{padding:1.5rem}input[_ngcontent-%COMP%]{font-size:.9rem;padding:.7rem}button[_ngcontent-%COMP%]{font-size:.9rem;padding:.7rem 1rem}h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{font-size:1.5rem}}"]})};var he=[{path:"buscar-peliculas",component:A},{path:"register",loadComponent:()=>import("./chunk-ERHJ7WHX.js").then(n=>n.RegisterComponent)},{path:"login",loadComponent:()=>import("./chunk-RCCNMZDK.js").then(n=>n.LoginComponent)},{path:"*",redirectTo:"login"},{path:"watchList",component:D},{path:"profile",component:$}];var be={providers:[Y({eventCoalescing:!0}),re(he),ee()]};function Be(n,t){n&1&&(o(0,"a",10),r(1," Lista de pel\xEDculas "),i())}function Ge(n,t){n&1&&(L(0),o(1,"a",11),r(2," Registrarse "),i(),o(3,"a",12),r(4," Iniciar Sesion "),i(),z())}function qe(n,t){n&1&&(o(0,"a",13),r(1," Perfil "),i())}function Je(n,t){if(n&1){let e=M();o(0,"button",14),u("click",function(){C(e);let c=d();return v(c.logout())}),r(1," Cerrar sesi\xF3n "),i()}}var U=class n{constructor(t){this.authService=t}logout(){this.authService.logout()}static \u0275fac=function(e){return new(e||n)(g(y))};static \u0275cmp=h({type:n,selectors:[["app-header"]],standalone:!0,features:[b],decls:12,vars:4,consts:[[1,"bg-gray-800","p-4","text-white"],[1,"container","mx-auto","flex","justify-between","items-center"],[1,"nav-left"],["routerLink","/",1,"text-xl","font-bold"],["routerLink","/buscar-peliculas",1,"nav-link"],["routerLink","/watchList","class","nav-link",4,"ngIf"],[1,"nav-right"],[4,"ngIf"],["routerLink","/profile","class","nav-link",4,"ngIf"],["class","text-sm underline",3,"click",4,"ngIf"],["routerLink","/watchList",1,"nav-link"],["routerLink","/register",1,"nav-link"],["routerLink","/login",1,"nav-link"],["routerLink","/profile",1,"nav-link"],[1,"text-sm","underline",3,"click"]],template:function(e,a){e&1&&(o(0,"nav",0)(1,"div",1)(2,"div",2)(3,"a",3),r(4,"Filmoteca"),i(),o(5,"a",4),r(6," Buscar Pel\xEDculas "),i(),m(7,Be,2,0,"a",5),i(),o(8,"div",6),m(9,Ge,5,0,"ng-container",7)(10,qe,2,0,"a",8)(11,Je,2,0,"button",9),i()()()),e&2&&(l(7),s("ngIf",a.authService.isAuthenticated()),l(2),s("ngIf",!a.authService.isAuthenticated()),l(),s("ngIf",a.authService.isAuthenticated()),l(),s("ngIf",a.authService.isAuthenticated()))},dependencies:[oe,E],styles:["nav[_ngcontent-%COMP%]{background-color:transparent;color:#fff;padding:3rem;font-family:Arial,sans-serif;padding-top:30px}.container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.nav-left[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#f5ea14;margin-right:20px;font-weight:700;font-size:1rem;transition:color .3s ease-in-out}.nav-left[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#d2d26e}.nav-right[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#e4dbec;margin-left:15px;font-size:.9rem;padding:5px 10px;border:2px solid transparent;border-radius:4px;transition:all .3s ease-in-out}button[_ngcontent-%COMP%]{background:none;border:none;color:#fff;font-size:.9rem;cursor:pointer;text-decoration:underline;margin-left:15px}button[_ngcontent-%COMP%]:hover{color:#8d00d4}@media (max-width: 768px){.container[_ngcontent-%COMP%]{flex-direction:column;text-align:center}.nav-left[_ngcontent-%COMP%], .nav-right[_ngcontent-%COMP%]{margin-bottom:10px}.nav-left[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .nav-right[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{margin:5px 0}}"]})};var V=class n{title="frontend";static \u0275fac=function(e){return new(e||n)};static \u0275cmp=h({type:n,selectors:[["app-root"]],standalone:!0,features:[b],decls:3,vars:0,template:function(e,a){e&1&&(o(0,"div"),f(1,"app-header")(2,"router-outlet"),i())},dependencies:[ne,U],styles:["[_nghost-%COMP%]{display:block;margin:0;background-color:#130728}h1[_ngcontent-%COMP%]{text-align:center;font-size:40px;color:#f0f8ff;margin-top:20px;margin-bottom:20px}.nav-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:20px;margin-bottom:30px;padding:0 20px}.nav-left[_ngcontent-%COMP%]{display:flex;gap:20px}.nav-right[_ngcontent-%COMP%]{display:flex;gap:20px;margin-left:40px}.nav-button[_ngcontent-%COMP%]{padding:10px 20px;border:none;border-radius:5px;text-decoration:none;font-size:14px;font-weight:700;transition:background-color .3s,color .3s;cursor:pointer}.nav-button.watchList[_ngcontent-%COMP%]{background-color:#3a096f;color:#fff}.nav-button.watchList[_ngcontent-%COMP%]:hover{background-color:#491085}.nav-button.buscar-peliculas[_ngcontent-%COMP%]{background-color:#3a096f;color:#fff}.nav-button.buscar-peliculas[_ngcontent-%COMP%]:hover{background-color:#491085}.nav-button.register[_ngcontent-%COMP%]{background-color:#3a096f;color:#fff}.nav-button.register[_ngcontent-%COMP%]{background-color:#491085}.nav-button.login[_ngcontent-%COMP%]{background-color:transparent;color:#fff}app-header[_ngcontent-%COMP%]{display:block;height:50px;margin-bottom:30px}router-outlet[_ngcontent-%COMP%]{display:block;margin-top:20px;background-color:#08020b;padding:10px;border-radius:5px;box-shadow:0 0 10px #0000001a;text-align:center;font-size:18px;color:#000}div[_ngcontent-%COMP%]{text-align:center}"]})};te(V,be).catch(n=>console.error(n));