var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});

const generateButton = document.getElementById("generate");

generateButton.onclick = () => {
  const domain = document.getElementById("domain").value;
  const author = document.getElementById("author").value.replace("\n", "\\n");
  const title = document.getElementById("title").value.replace("\n", "\\n");
  const description = document
    .getElementById("description")
    .value.replace("\n", "\\n");
  const color = document.getElementById("color").value;
  const image = document.getElementById("image").value;
  const redirect = document.getElementById("redirect").value;

  const params = new URLSearchParams();
  if (author) params.set("author", encodeURIComponent(author));
  if (title) params.set("title", encodeURIComponent(title));
  if (description) params.set("description", encodeURIComponent(description));
  if (color !== "#000000") params.set("color", color.slice(1));
  if (image) params.set("image", encodeURIComponent(image));
  if (redirect) params.set("redirect", encodeURIComponent(redirect));
  console.log("params", params.toString());

  const finalURLText = document.getElementById("finalURLText");
  finalURLText.innerText = `${domain}?${params.toString()}`;
  const finalURL = document.getElementById("finalURL");
  finalURL.hidden = false;
};


}
/*
     FILE ARCHIVED ON 02:15:39 Jun 12, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:29:36 Aug 04, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.615
  exclusion.robots: 0.029
  exclusion.robots.policy: 0.018
  esindex: 0.011
  cdx.remote: 6.015
  LoadShardBlock: 233.954 (3)
  PetaboxLoader3.datanode: 50.78 (4)
  PetaboxLoader3.resolve: 323.968 (3)
  load_resource: 145.998
*/