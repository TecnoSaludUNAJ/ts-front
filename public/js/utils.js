export const formatHoursTwoDigits = (date) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

export const getParamURL = (name) =>
  decodeURIComponent(
    (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
      location.search
    ) || [, ""])[1].replace(/\+/g, "%20")
  ) || null;