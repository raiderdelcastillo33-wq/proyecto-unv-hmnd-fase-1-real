var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t=document){let n=t.querySelector(e);if(!n)throw Error(`No se encontro el elemento requerido: ${e}`);return n}function r(){let e=n(`#user-form`),t=n(`#ai-form`);return{shell:{heroStatusPillEl:n(`#hero-status-pill`),heroStatusCopyEl:n(`#hero-status-copy`),systemServiceNameEl:n(`#system-service-name`),currentUserChipEl:n(`#current-user-chip`),catalogStatusCopyEl:n(`#catalog-status-copy`),assistantUserStateEl:n(`#assistant-user-state`),systemLastCheckEl:n(`#system-last-check`)},health:{statusEl:n(`#health-status`),metaEl:n(`#health-meta`),serviceDetailEl:n(`#health-service-detail`),visualDetailEl:n(`#health-visual-detail`),calloutEl:n(`.status-callout`),button:n(`#refresh-health`)},user:{form:e,submitButton:n(`button[type="submit"]`,e),emailInput:n(`#email`),displayNameInput:n(`#displayName`),feedbackCardEl:n(`.feedback-card`),resultEl:n(`#user-result`)},catalog:{button:n(`#load-catalog`),outputEl:n(`#catalog-output`),courseCountEl:n(`#catalog-course-count`),moduleCountEl:n(`#catalog-module-count`),lessonCountEl:n(`#catalog-lesson-count`),resourceCountEl:n(`#catalog-resource-count`)},assistant:{form:t,submitButton:n(`button[type="submit"]`,t),promptInput:n(`#ai-prompt`),responseCardEl:n(`.assistant-response`),resultEl:n(`#ai-result`)}}}var i=e((()=>{}));function a(){let e=new Set,t={currentUserId:null};function n(){let n={...t};e.forEach(e=>{e(n)})}return{getSnapshot(){return{...t}},setCurrentUserId(e){t.currentUserId=e,n()},subscribe(n){return e.add(n),n({...t}),()=>{e.delete(n)}}}}var o=e((()=>{}));function s(e,t){return{success:!1,error:{code:e,message:t}}}async function c(e,t){let n=new Headers(t?.headers);n.has(`Content-Type`)||n.set(`Content-Type`,`application/json`);let r;try{r=await fetch(e,{...t,headers:n})}catch(e){return s(`NETWORK_ERROR`,e instanceof Error?e.message:`Network request failed`)}let i=(r.headers.get(`content-type`)??``).includes(`application/json`),a=i?await r.json():await r.text();return r.ok?i?a:s(`INVALID_RESPONSE`,`The server did not return JSON`):l(a)?a:typeof a==`string`&&a.trim().length>0?s(`HTTP_${r.status}`,a.trim()):s(`HTTP_${r.status}`,`Request failed with status ${r.status}`)}function l(e){return typeof e==`object`&&!!e&&`success`in e&&e.success===!1}var u,d=e((()=>{u={getHealth(){return c(`/health`)},registerUser(e){return c(`/api/v1/users/register`,{method:`POST`,body:JSON.stringify(e)})},loadCatalog(){return c(`/api/v1/catalog/list`,{method:`GET`})},askAssistant(e){return c(`/api/v1/ai/ask`,{method:`POST`,body:JSON.stringify(e)})}}}));function f(e,t,n){e.dataset.defaultLabel||(e.dataset.defaultLabel=e.textContent?.trim()??``),e.disabled=t,e.textContent=t?n:e.dataset.defaultLabel}var p=e((()=>{}));function m(e,t,n){e.container.dataset.state=t,e.messageElement.textContent=n}var h=e((()=>{}));function g(e){_(e,`Crea un usuario demo para activar el asistente y recibir una respuesta generada.`,`idle`)}function _(e,t,n){m({container:e.assistant.responseCardEl,messageElement:e.assistant.resultEl},n,t)}var v=e((()=>{h()}));function y({dom:e,appState:t}){g(e),e.assistant.form.addEventListener(`submit`,e=>{n(e)});async function n(n){n.preventDefault();let r=t.getSnapshot().currentUserId;if(!r){_(e,`Primero crea un usuario demo para usar el asistente.`,`pending`);return}f(e.assistant.submitButton,!0,`Consultando...`),_(e,`El asistente esta analizando tu solicitud...`,`pending`);try{let t=await u.askAssistant({userId:r,feature:`assistant`,prompt:e.assistant.promptInput.value});if(l(t)){_(e,`${t.error.code}: ${t.error.message}`,`error`);return}_(e,t.data.response,`success`)}catch(t){_(e,`Error al consultar el asistente: ${t.message}`,`error`)}finally{f(e.assistant.submitButton,!1,`Consultando...`)}}}var b=e((()=>{d(),p(),v()}));function x(e){return{courseCount:e.items.length,moduleCount:e.items.reduce((e,t)=>e+t.modules.length,0),lessonCount:e.items.reduce((e,t)=>e+t.modules.reduce((e,t)=>e+t.lessons.length,0),0),resourceCount:e.resources.length}}var S=e((()=>{}));function C(e=new Date){return new Intl.DateTimeFormat(`es-ES`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}).format(e)}function w(e,t=18){if(e.length<=t)return e;let n=Math.ceil((t-3)/2),r=Math.floor((t-3)/2);return`${e.slice(0,n)}...${e.slice(-r)}`}function T(e){return{beginner:`Beginner`,intermediate:`Intermediate`,advanced:`Advanced`}[e]}function E(e){return e.split(`-`).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(` `)}var D=e((()=>{}));function O(e,t){k(e,`Preparando la vista, comprobando salud del servicio y activando el workspace.`,`pending`),A(e,0,0,0,0),j(e,`Listo para cargar`),t.subscribe(t=>{M(e,t)})}function k(e,t,n){let r={pending:`Sincronizando sistema`,success:`Sistema operativo`,error:`Conexion inestable`};e.shell.heroStatusPillEl.dataset.state=n,e.shell.heroStatusPillEl.textContent=r[n],e.shell.heroStatusCopyEl.textContent=t}function A(e,t,n,r,i){e.catalog.courseCountEl.textContent=String(t),e.catalog.moduleCountEl.textContent=String(n),e.catalog.lessonCountEl.textContent=String(r),e.catalog.resourceCountEl.textContent=String(i)}function j(e,t){e.shell.catalogStatusCopyEl.textContent=t}function M(e,t){e.shell.currentUserChipEl.textContent=t.currentUserId?w(t.currentUserId):`Sin crear`,e.shell.assistantUserStateEl.textContent=t.currentUserId?`Listo para responder`:`Esperando usuario`}var N=e((()=>{D()}));function P(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`};return e.replace(/[&<>"']/g,e=>t[e]??e)}var F=e((()=>{}));function I(e){e.innerHTML=`
    <div class="empty-state">
      <span class="empty-state-badge">Ready</span>
      <h3>El contenido aun no se ha cargado</h3>
      <p>
        Cuando pulses "Cargar catalogo", aqui veras una vista editorial del contenido disponible y
        los recursos base sembrados por la aplicacion.
      </p>
    </div>
  `}function L(e,t){e.innerHTML=`<div class="catalog-error">${P(t)}</div>`}function R(e,t){let{items:n,resources:r}=t;if(n.length===0&&r.length===0){e.innerHTML=`
      <div class="empty-state">
        <span class="empty-state-badge">Sin contenido</span>
        <h3>No hay cursos ni recursos publicados todavia</h3>
        <p>La estructura visual ya esta preparada. Cuando el backend publique contenido, aparecera aqui.</p>
      </div>
    `;return}e.innerHTML=`
    <div class="catalog-layout">
      <section class="catalog-column">
        <div class="catalog-column-header">
          <div>
            <p class="catalog-section-tag">Published courses</p>
            <h3>Ruta de aprendizaje</h3>
            <p>Cada curso aparece con su estructura interna para que el producto se sienta navegable y escalable.</p>
          </div>
        </div>
        ${n.length>0?n.map(z).join(``):`<div class="course-empty">Todavia no hay cursos publicados. Los recursos base siguen disponibles en la columna lateral.</div>`}
      </section>

      <aside class="catalog-column">
        <div class="catalog-column-header">
          <div>
            <p class="catalog-section-tag">Knowledge assets</p>
            <h3>Recursos base</h3>
            <p>Plantillas, snippets y piezas de apoyo listas para convertirse en una biblioteca real.</p>
          </div>
        </div>
        <div class="resource-list">
          ${r.length>0?r.map(B).join(``):`<div class="course-empty">Todavia no hay recursos de apoyo cargados.</div>`}
        </div>
      </aside>
    </div>
  `}function z(e){let t=e.modules.length,n=e.modules.reduce((e,t)=>e+t.lessons.length,0),r=e.modules.length>0?e.modules.map(e=>`
              <div class="module-card">
                <div class="module-title-row">
                  <div class="module-index">${String(e.module.position).padStart(2,`0`)}</div>
                  <div>
                    <h4>${P(e.module.title)}</h4>
                    <div class="lesson-meta">${e.lessons.length} lecciones</div>
                  </div>
                </div>
                <div class="module-lessons">
                  ${e.lessons.map(V).join(``)}
                </div>
              </div>
            `).join(``):`<div class="course-empty">Este curso aun no tiene modulos publicados.</div>`;return`
    <article class="course-card">
      <div class="course-card-top">
        <div>
          <h3>${P(e.course.title)}</h3>
          <p class="course-description">${P(e.course.description)}</p>
        </div>
        <span class="course-level">${P(T(e.course.level))}</span>
      </div>

      <div class="course-inline-stats">
        <span>${t} modulos</span>
        <span>${n} lecciones</span>
      </div>

      <div class="module-stack">
        ${r}
      </div>
    </article>
  `}function B(e){let t=e.content??e.url??`Contenido de apoyo preparado para evolucionar con el producto.`;return`
    <article class="resource-card">
      <div class="course-card-top">
        <div>
          <h4>${P(e.title)}</h4>
          <p>${P(e.description)}</p>
        </div>
        <span class="resource-category">${P(e.category)}</span>
      </div>
      <div class="resource-content">${P(t)}</div>
    </article>
  `}function V(e){return`
    <article class="lesson-item">
      <strong>${P(e.title)}</strong>
      <div class="lesson-meta">${P(E(e.type))} · ${e.durationMinutes} min</div>
      <p class="lesson-objective">${P(e.objective)}</p>
    </article>
  `}var H=e((()=>{D(),F()}));function U({dom:e}){I(e.catalog.outputEl),e.catalog.button.addEventListener(`click`,()=>{t()});async function t(){f(e.catalog.button,!0,`Cargando...`),j(e,`Cargando contenido`);try{let t=await u.loadCatalog();if(l(t)){L(e.catalog.outputEl,`${t.error.code}: ${t.error.message}`),j(e,`Error de catalogo`);return}let n=x(t.data);A(e,n.courseCount,n.moduleCount,n.lessonCount,n.resourceCount),j(e,`${n.courseCount} cursos / ${n.resourceCount} recursos`),R(e.catalog.outputEl,t.data)}catch(t){L(e.catalog.outputEl,`No se pudo cargar el catalogo: ${t.message}`),j(e,`Error de carga`)}finally{f(e.catalog.button,!1,`Cargando...`)}}}var W=e((()=>{d(),p(),S(),N(),H()}));function G({dom:e}){let t=async()=>{f(e.health.button,!0,`Actualizando...`),e.health.calloutEl.dataset.state=`pending`,e.health.visualDetailEl.textContent=`Sincronizando panel`;try{let t=await u.getHealth();if(l(t))throw Error(t.error.message);let n=C();e.health.statusEl.textContent=`Servicio ${t.service}: ${t.status}`,e.health.metaEl.textContent=`El backend responde correctamente y la superficie visual esta sincronizada.`,e.health.calloutEl.dataset.state=`success`,e.shell.systemServiceNameEl.textContent=t.service,e.health.serviceDetailEl.textContent=t.service,e.health.visualDetailEl.textContent=`Panel sincronizado`,e.shell.systemLastCheckEl.textContent=n,k(e,`La infraestructura responde bien y el workspace esta listo para usarse.`,`success`)}catch(t){e.health.statusEl.textContent=`No fue posible verificar el servicio`,e.health.metaEl.textContent=`Error al consultar health: ${t.message}`,e.health.calloutEl.dataset.state=`error`,e.health.visualDetailEl.textContent=`Revision requerida`,k(e,`La vista sigue disponible, pero la conexion con el backend necesita revision.`,`error`)}finally{f(e.health.button,!1,`Actualizando...`)}};return e.health.button.addEventListener(`click`,()=>{t()}),{loadHealth:t}}var K=e((()=>{d(),p(),D(),N()}));function q({dom:e,appState:t}){J(e,`Completa el formulario para crear un usuario demo.`,`neutral`),e.user.form.addEventListener(`submit`,e=>{n(e)});async function n(n){n.preventDefault(),f(e.user.submitButton,!0,`Creando...`),J(e,`Creando identidad demo y preparando el entorno para la IA...`,`pending`);try{let n=await u.registerUser({email:e.user.emailInput.value,displayName:e.user.displayNameInput.value,level:`beginner`,goals:[`aprender via frontend`]});if(l(n)){J(e,`${n.error.code}: ${n.error.message}`,`error`);return}t.setCurrentUserId(n.data.id),J(e,`Usuario demo creado con exito. ID: ${n.data.id}`,`success`),_(e,`Usuario activo. Ya puedes consultar al asistente IA.`,`idle`)}catch(t){J(e,`Error al crear usuario: ${t.message}`,`error`)}finally{f(e.user.submitButton,!1,`Creando...`)}}}function J(e,t,n){m({container:e.user.feedbackCardEl,messageElement:e.user.resultEl},n,t)}var Y=e((()=>{d(),p(),h(),v()}));function X(){let e=r(),t=a();O(e,t),y({dom:e,appState:t}),q({dom:e,appState:t}),U({dom:e}),G({dom:e}).loadHealth()}var Z=e((()=>{i(),o(),b(),W(),K(),N(),Y()}));t((()=>{Z(),X()}))();