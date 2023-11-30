// ========== CDNjs Script Loader ==========

var resourceUrls = [
  'https://cdn.plyr.io/3.7.8/plyr.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.0/dist/sweetalert2.min.css',
  'https://cdn.plyr.io/3.7.8/plyr.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.0/dist/sweetalert2.all.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.2/font/bootstrap-icons.min.css'
];

resourceUrls.forEach(function(url) {
  if (url.endsWith('.js')) {
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
  } else if (url.endsWith('.css')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
});

// ====== Open Source Information ======

console.info("%cThis website is open source and can be freely redeveloped by developers.", "color: #3498db; font-size: 16px; font-weight: bold;");
console.info("%cFor mature content, please be advised:", "color: #e74c3c; font-size: 14px; font-weight: bold;");
console.info("%cMature Content Warning", "color: #e74c3c; font-size: 14px; font-weight: bold;");
console.info("%cThis site contains mature content and should only be accessed by users 18 years of age or older.", "font-size: 12px; color: #e74c3c;");

// ====== Internet Speed Information ======

function getInternetSpeed() {
  if (navigator.connection) {
    const connection = navigator.connection;
    const {
      downlink,
      effectiveType,
      saveData,
      rtt,
      type,
      onchange
    } = connection;

    console.warn(`🚀 Internet Connection Details 🚀\n` +
      `-----------------------------------\n` +
      `Download Speed: ${downlink.toFixed(2)} Mbps\n` +
      `Connection Type: ${effectiveType}\n` +
      `Data Saver Mode: ${saveData ? 'Enabled' : 'Disabled'}\n` +
      `Round-Trip Time (RTT): ${rtt} milliseconds\n` +
      `Connection Type: ${type}\n` +
      `-----------------------------------`);

    if (onchange) {
      console.warn(`Connection Change Event Listener: Enabled`);
    } else {
      console.warn(`Connection Change Event Listener: Disabled`);
    }
  } else {
    console.error('Browser does not support the connection API.');
  }
}

getInternetSpeed();

// ========== Category Header =========

document.addEventListener('DOMContentLoaded', function() {
  const body = document.querySelector('body');

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid', 'fixed-top');
  containerFluid.id = 'headerContainer';

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  buttonContainer.id = 'buttonContainer';

  const anchor = document.createElement('a');
  anchor.href = './';

  const button = document.createElement('button');
  button.classList.add('btn');

  const icon = document.createElement('i');
  icon.classList.add('bi', 'bi-house-heart');

  const buttonText = document.createTextNode(' HOME');

  button.appendChild(icon);
  button.appendChild(buttonText);
  anchor.appendChild(button);
  buttonContainer.appendChild(anchor);
  containerFluid.appendChild(buttonContainer);
  body.appendChild(containerFluid);

  fetch('https://api.github.com/repos/cewekmurahan/cewekmurahan.github.io/contents/.mp4')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        if (item.type === 'dir') {
          const button = document.createElement('a');
          button.href = '/getrequest.html?@' + item.name;
          button.classList.add('btn');
          button.textContent = item.name;

          button.style.backgroundColor = getRandomColor();

          const fontSize = parseFloat(window.getComputedStyle(button, null).getPropertyValue('font-size'));
          button.style.width = `${fontSize * 1.5}px`;

          buttonContainer.appendChild(button);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      console.error(error.message);
      console.error(error.stack);
    });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// ========== Bottom Navigation ==========
document.addEventListener('DOMContentLoaded', function() {
  createHTMLStructure();
});

function createHTMLStructure() {
  var mainDiv = document.createElement('div');
  mainDiv.classList.add('fixed-bottom', 'bg-dark', 'text-white', 'p-2', 'rounded-top');

  var containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  var rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  var colDiv = document.createElement('div');
  colDiv.classList.add('col-md-8');

  var inputGroupDiv = document.createElement('div');
  inputGroupDiv.classList.add('input-group', 'mb-3');

  var inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('id', 'urlInput');
  inputElement.classList.add('form-control', 'bg-dark', 'text-white', 'mt-2');
  inputElement.setAttribute('value', window.location.href);
  inputElement.setAttribute('readonly', '');

  var inputGroupAppendDiv = document.createElement('div');
  inputGroupAppendDiv.classList.add('input-group-append', 'mx-3', 'pt-3');

  var iconElement = document.createElement('span');
  iconElement.classList.add('bi', 'bi-share', 'bi-lg');
  iconElement.setAttribute('onclick', 'copyURL()');

  inputGroupAppendDiv.appendChild(iconElement);
  inputGroupDiv.appendChild(inputElement);
  inputGroupDiv.appendChild(inputGroupAppendDiv);
  colDiv.appendChild(inputGroupDiv);
  rowDiv.appendChild(colDiv);
  containerDiv.appendChild(rowDiv);
  mainDiv.appendChild(containerDiv);

  document.body.appendChild(mainDiv);
}

function copyURL() {
  var copyText = document.getElementById('urlInput');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');

  Swal.fire({
    icon: 'success',
    title: 'Copied!',
    text: 'URL successfully copied: ' + copyText.value,
  });
}

// ========= Index.html =========

function indexhtml() {

  const mainDiv = document.createElement('div');
  mainDiv.classList.add('container', 'p-3', 'mt-5', 'pt-2');

  const videosContainerDiv = document.createElement('div');
  videosContainerDiv.id = 'videosContainer';
  videosContainerDiv.classList.add('row');

  mainDiv.appendChild(videosContainerDiv);

  document.body.appendChild(mainDiv);

  (function() {
    fetch('https://api.github.com/repos/cewekmurahan/cewekmurahan.github.io/contents/.mp4')
      .then(response => response.json())
      .then(data => {

        data.forEach(video => {
          if (video.type === 'file' && video.name.endsWith('.mp4')) {
            const col = document.createElement("div");
            col.classList.add("col-md-6", "mb-3");

            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            const videoElement = document.createElement("video");
            videoElement.classList.add("plyr");
            videoElement.setAttribute("controls", true);

            const sourceElement = document.createElement("source");
            sourceElement.src = video.download_url;
            sourceElement.type = "video/mp4";

            videoElement.appendChild(sourceElement);

            const videoInfo = document.createElement("div");
            videoInfo.classList.add("video-info");
            const fileNameWithoutExtension = video.name.split('.').slice(0, -1).join('.');
            videoInfo.innerHTML = `<a href="crot.html?mmk=${video.name}"><strong>${fileNameWithoutExtension.replace(/_/g, ' ')}</strong></a><br>
                                    SHA: ${video.sha}<br>
                                    Size: ${video.size} bytes`;

            videoContainer.appendChild(videoElement);
            col.appendChild(videoContainer);
            col.appendChild(videoInfo);

            videosContainer.appendChild(col);

            const plyrInstance = new Plyr(videoElement);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.error(error.message);
        console.error(error.stack);
      });

  })();
  console.log('Run index.html');
}


// ========== Crot.html ==========

function crothtml() {
  document.addEventListener('DOMContentLoaded', function() {

    var videosDiv = document.createElement('div');
    videosDiv.id = 'videos';
    videosDiv.className = 'row m-3 mt-5 pt-2 mb-5 pb-5';

    var notificationDiv = document.createElement('div');
    notificationDiv.id = 'notification';
    notificationDiv.className = 'notification';
    notificationDiv.textContent = 'Video not found!';

    document.body.appendChild(videosDiv);
    document.body.appendChild(notificationDiv);
  });


  const queryString = window.location.search;
  const regexPattern = /mmk=([^&]+)/;
  const match = queryString.match(regexPattern);

  let name, beforeAmpersand, afterAmpersand;

  if (match) {
    name = match[1].replace(/%20/g, ' ');

    if (queryString.includes("&=")) {
      const secondPattern = /mmk=([^&]+)&=([^&]+)/;
      const secondMatch = queryString.match(secondPattern);

      if (secondMatch) {
        beforeAmpersand = secondMatch[1].replace(/%20/g, ' ');
        afterAmpersand = secondMatch[2].replace(/%20/g, ' ');
      }
    }
  }

  const baseApiDefault = 'https://api.github.com/repos/cewekmurahan/cewekmurahan.github.io/contents/.mp4';
  const baseApiCustom = beforeAmpersand ? `${baseApiDefault}/${beforeAmpersand}` : baseApiDefault;
  const mixApi = baseApiCustom || baseApiDefault;
  const mixTitle = afterAmpersand || name;

  document.addEventListener('DOMContentLoaded', () => {
    fetch(mixApi)
      .then(response => response.json())
      .then(data => {
        const videosContainer = document.getElementById("videos");
        const notification = document.getElementById("notification");

        if (Array.isArray(data)) {
          const searchNameData = data.find(item => item.name === mixTitle);

          if (searchNameData) {

            document.title = searchNameData.name;

            const col = document.createElement("div");
            col.classList.add("col-md-6", "mb-3");

            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            const videoElement = document.createElement("video");
            videoElement.classList.add("plyr");
            videoElement.setAttribute("controls", true);

            const sourceElement = document.createElement("source");
            sourceElement.src = searchNameData.download_url;
            sourceElement.type = "video/mp4";

            videoElement.appendChild(sourceElement);

            const videoInfo = document.createElement("div");
            videoInfo.classList.add("video-info");

            const bytesToMB = bytes => (bytes / (1024 * 1024)).toFixed(2) + ' MB';
            const fileNameWithoutExtension = searchNameData.name.split('.').slice(0, -1).join('.');
            const videoInfoContent = `
            <strong>${fileNameWithoutExtension.replace(/_/g, ' ')}</strong><br>
            <i class="fas fa-fingerprint"></i> ${searchNameData.sha}<br>
            Size: ${bytesToMB(searchNameData.size)}<br>
            <a id="downloadLink" href="${searchNameData.download_url}?"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg> Download</a>
          `;

            videoInfo.innerHTML = videoInfoContent;
            videoContainer.appendChild(videoElement);
            col.appendChild(videoContainer);
            col.appendChild(videoInfo);

            videosContainer.appendChild(col);
            const plyrInstance = new Plyr(videoElement);
          } else {
            notification.style.display = "block";
          }
        } else {
          notification.style.display = "block";
        }
      })
      .catch(error => console.error('Error:', error));
  });
  console.log('Run crot.html')
}


// ========== Getrequest.html ==========

function getrequesthtml() {

  const videosContainer = document.createElement('div');
  videosContainer.id = 'videosContainer';
  videosContainer.className = 'row m-3 mt-5 pt-2 mb-5 pb-5';
  document.body.appendChild(videosContainer);

  (async () => {
    const createPlyrInstances = async (users) => {
      try {
        const response = await fetch(`https://api.github.com/repos/cewekmurahan/cewekmurahan.github.io/contents/.mp4/${users}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const videoData = await response.json();

        if (Array.isArray(videoData)) {
          videoData.forEach((video) => {
            const col = document.createElement('div');
            col.classList.add('col-md-6', 'mb-3');

            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');

            const videoElement = document.createElement('video');
            videoElement.classList.add('plyr');
            videoElement.setAttribute('controls', true);

            const sourceElement = document.createElement('source');
            sourceElement.src = video.download_url;
            sourceElement.type = 'video/mp4';

            videoElement.appendChild(sourceElement);

            const videoInfo = document.createElement('div');
            videoInfo.classList.add('video-info');
            const fileNameWithoutExtension = video.name.split('.').slice(0, -1).join('.');
            videoInfo.innerHTML = `<a href="crot.html?mmk=${users}&=${video.name}"><strong>${fileNameWithoutExtension.replace(
                /_/g,
                ' '
              )}</strong></a><br>SHA: ${video.sha}<br>Size: ${video.size} bytes`;

            videoContainer.appendChild(videoElement);
            col.appendChild(videoContainer);
            col.appendChild(videoInfo);

            videosContainer.appendChild(col);

            const plyrInstance = new Plyr(videoElement);
          });
        } else {
          console.error('Invalid video data format:', videoData);
        }

        if (videoData.length === 0) {
          notification.style.display = 'block';
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    try {
      const users = window.location.search.split('@')[1];
      await createPlyrInstances(users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })();

  console.log('Run getreques.html')
}

// ========== Statcounter ==========

function encodeURLParams(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

function deleteCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

var urlParams = {
  u: window.location.href,
  sc_project: '12945502',
  security: 'f263ed99'
};

var statcounterCustom = 'https://c.statcounter.com/t.php?' + encodeURLParams(urlParams);

var iframe = document.createElement("iframe");
iframe.id = "statcounterIframe";
iframe.frameBorder = "0";
iframe.src = "";
//iframe.className = "d-none";

document.body.appendChild(iframe);
document.getElementById('statcounterIframe').src = statcounterCustom;

window.reloadCount = 0;

setInterval(function() {
  deleteCookies();
  document.getElementById('statcounterIframe').src = statcounterCustom;
  window.reloadCount++;
  console.log('Number of iframe reloads:', reloadCount);
}, 5000);
