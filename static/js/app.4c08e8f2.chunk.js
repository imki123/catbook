(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{140:function(e,t,a){e.exports=a.p+"static/media/main.39efc8fa.png"},141:function(e,t,a){e.exports=a.p+"static/media/dog_main.d60d4c9c.png"},90:function(e,t,a){"use strict";a.d(t,"a",(function(){return T}));var n=a(11),o=a.n(n),r=a(0),l=a.n(r),c=a(4),i=a(3),s=a(28),d=a(48),m=a(81),u=a(44),b=a(82),f=a(89),g=a(46),h=a(37),p=a(2),y=a(16),x=a(91),k=Math.round(y.a.get("window").width),E=(Math.round(y.a.get("window").height),p.a.create({container:{flex:1,alignItems:"center",justifyContent:"center",marginTop:x.a.statusBarHeight,width:k,maxWidth:600,margin:"auto"},contentContainer:{flexGrow:1,alignItems:"center",justifyContent:"center",width:k,maxWidth:600,margin:"auto"},title:{fontSize:30,fontWeight:"bold"},image:{width:"100%",height:300,resizeMode:"contain"},button:{backgroundColor:"blue",paddingHorizontal:20,paddingVertical:15,borderRadius:5},buttonText:{fontSize:20,color:"#fff"},textContainer:{textAlign:"left",width:k-100,maxWidth:500},contentText:{fontSize:16},changeBookView:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-end"},changeBookText:{margin:0,fontSize:16,color:"blue",padding:10},picker:{width:k-100,maxWidth:500,height:30,backgroundColor:"#eee"},stackTitle:{width:"100%",fontSize:16,color:"black",textAlign:"left"},stackView:{width:k-100,maxWidth:500,textAlign:"left"},stackFlex:{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"},stackImg:{width:50,height:50,resizeMode:"contain"},stackText:{margin:0,fontSize:16,color:"blue",paddingLeft:12}})),v=a(47),w=a(38),C=a.n(w),S=v.a.substring(0,2);function T(){var e=Object(r.useState)("cat"),t=o()(e,2),n=t[0],p=t[1],y=Object(r.useState)(null),x=o()(y,2),k=x[0],v=x[1],w=Object(r.useState)(null),T=o()(w,2),j=T[0],z=T[1],_=Object(r.useState)(""),O=o()(_,2),A=O[0],I=O[1],M=Object(r.useState)(null),V=o()(M,2),B=V[0],P=V[1],W=Object(r.useState)(!1),F=o()(W,2),D=F[0],H=F[1],J=Object(r.useState)([]),L=o()(J,2),G=L[0],R=L[1];Object(r.useEffect)((function(){var e=u.a.addEventListener("hardwareBackPress",(function(){return m.a.alert("Catbook \uc885\ub8cc","Catbook\uc744 \uc885\ub8cc\ud558\uc2dc\uaca0\uc5b4\uc694?",[{text:"Cancel",onPress:function(){return null},style:"cancel"},{text:"Yes",onPress:function(){v(null),P(null),I(""),p("cat"),u.a.exitApp()}}]),!0}));return function(){return e.remove()}}),[]),Object(r.useEffect)((function(){var e="https://api.thecatapi.com/v1/breeds";"cat"===n?e="https://api.thecatapi.com/v1/breeds":"dog"===n&&(e="https://api.thedogapi.com/v1/breeds"),C()(e).then((function(e){for(var t=[{label:"\ub79c\ub364",value:"random"}],a=0;a<e.data.length;a++)t.push({label:e.data[a].name,value:e.data[a].id});z(t),H(!0)}))}),[n]),Object(r.useEffect)((function(){""===A||Y()}),[A]);var Y=function(){var e=A;if("random"===A){if(D){var t=Math.floor(Math.random()*j.length);e=j[t].value,console.log("searchCatAsync, random breed:",e)}}else console.log("searchCatAsync, breed:",e);var a="https://blog-imki123-backend.herokuapp.com/catbook/getAnimal/cat/"+e;"dog"===n&&(a="https://blog-imki123-backend.herokuapp.com/catbook/getAnimal/dog/"+e),C.a.get(a,{withCredentials:!0}).then((function(e){if(e.data[0]){v(e.data[0].url),e.data[0].animal=n,R([e.data[0]].concat(G));var t="";e.data[0].breeds[0].temperament&&(t+=e.data[0].breeds[0].temperament),e.data[0].breeds[0].description&&(t+="__"+e.data[0].breeds[0].description);var a="https://blog-imki123-backend.herokuapp.com/catbook/translate/"+S+"/"+t;C.a.get(a).then((function(t){t=t.data.split("__"),e.data[0].breeds[0].temperament=t[0],e.data[0].breeds[0].description=t[1],P(e.data[0])})).catch((function(t){console.log(t),P(e.data[0])}))}else v(null),P("noInfo")}))};return l.a.createElement(b.a,{style:E.container},l.a.createElement(f.a,{contentContainerStyle:E.contentContainer,centerContent:!0},"cat"===n?l.a.createElement(c.a,{style:E.title},"Catbook ",l.a.createElement(h.a,{name:"cat2",style:{fontSize:20}})):l.a.createElement(c.a,{style:E.title},"Dogbook ",l.a.createElement(h.a,{name:"dog2",style:{fontSize:20}})),null===k?l.a.createElement(l.a.Fragment,null,"cat"===n?l.a.createElement(s.a,{source:a(140),style:E.image}):l.a.createElement(s.a,{source:a(141),style:E.image})):l.a.createElement(s.a,{source:{uri:k},style:E.image}),B&&l.a.createElement(l.a.Fragment,null,"noInfo"!=B?l.a.createElement(i.a,{style:E.textContainer},l.a.createElement(c.a,{style:E.contentText},"- \uc885\ub958: ",B.breeds[0].name),void 0!=B.breeds[0].alt_names&&l.a.createElement(c.a,{style:E.contentText},"- \ubcc4\uba85: ",B.breeds[0].alt_names),void 0!=B.breeds[0].origin&&l.a.createElement(c.a,{style:E.contentText},"- \ucd9c\uc2e0\uc9c0: ",B.breeds[0].origin),void 0!=B.breeds[0].adaptability&&l.a.createElement(c.a,{style:E.contentText},"- \uc801\uc751\ub825 / \uc560\uc815\ub3c4 / \uc5d0\ub108\uc9c0: ",B.breeds[0].adaptability," / ",B.breeds[0].affection_level," / ",B.breeds[0].energy_level),void 0!=B.breeds[0].child_friendly&&l.a.createElement(c.a,{style:E.contentText},"- \uc5b4\ub9b0\uc774\uce5c\ud654\ub825 / \uac15\uc544\uc9c0\uce5c\ud654\ub825: ",B.breeds[0].child_friendly," / ",B.breeds[0].dog_friendly),void 0!=B.breeds[0].temperament&&l.a.createElement(c.a,{style:E.contentText},"- \uc131\uaca9: ",B.breeds[0].temperament),void 0!=B.breeds[0].description&&l.a.createElement(c.a,{style:E.contentText},"- \ud2b9\uc9d5: ",B.breeds[0].description)):l.a.createElement(i.a,{style:E.textContainer},l.a.createElement(c.a,{style:{textAlign:"center"}},"\ucc3e\ub294 \uc815\ubcf4\uac00 \uc5c6\uc5b4\uc694 ",l.a.createElement(h.a,{name:"sob",style:{fontSize:20}})))),j&&l.a.createElement(g.a,{selectedValue:A,style:E.picker,onValueChange:function(e,t){I(e)}},j.map((function(e){return l.a.createElement(g.a.Item,{key:e.label,label:e.label,value:e.value})}))),l.a.createElement(d.a,{onPress:function(){""===A?I("random"):Y()},style:E.button},l.a.createElement(c.a,{style:E.buttonText},"cat"===n?"\uace0\uc591\uc774 \ucc3e\uae30":"\uac15\uc544\uc9c0 \ucc3e\uae30")),l.a.createElement(i.a,{style:E.changeBookView},l.a.createElement(c.a,{style:E.changeBookText,onPress:function(){p("cat"===n?"dog":"cat"),I(""),v(null),P(null),H(!1)}},"cat"===n?"\uac15\uc544\uc9c0 \uc88b\uc544\ud574?":"\uace0\uc591\uc774 \ubcf4\ub7ec\uac08\ub798?")),l.a.createElement(i.a,{style:E.stackView},G.length>0&&l.a.createElement(c.a,{style:E.stackTitle},"cat"===n?"\ucc3e\uc544\ubcf8 \uace0\uc591\uc774":"\ucc3e\uc544\ubcf8 \uac15\uc544\uc9c0"),G.map((function(e,t){return n===e.animal&&l.a.createElement(d.a,{style:E.stackFlex,key:t,onPress:function(){return function(e){v(G[e].url),P(G[e])}(t)}},l.a.createElement(s.a,{source:{uri:e.url},style:E.stackImg}),l.a.createElement(c.a,{style:E.stackText},e.breeds[0].name))})))))}console.log("My device's locale:",v.a,"--\x3e",S)},92:function(e,t,a){e.exports=a(145)}},[[92,1,2]]]);
//# sourceMappingURL=app.4c08e8f2.chunk.js.map