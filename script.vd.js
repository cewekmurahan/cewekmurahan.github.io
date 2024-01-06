const CDN_URLS = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.2/sweetalert2.css',
  'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.2/sweetalert2.min.js',
  'https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css',
  'https://cdn.plyr.io/3.7.8/plyr.css',
  'https://cdn.plyr.io/3.7.8/plyr.polyfilled.js'
];

/**
 * Load external scripts or stylesheets dynamically into the head of the HTML document
 * @param {string[]} urls - Array of URLs to load
 */

function loadExternalScripts(urls) {
  const headElement = document.head || document.getElementsByTagName('head')[0];

  urls.forEach(url => {
    const isJavaScript = url.endsWith('.js');
    const isStyleSheet = url.endsWith('.css');

    if (isJavaScript) {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      headElement.appendChild(scriptElement);
    } else if (isStyleSheet) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      headElement.appendChild(linkElement);
    }
  });
}

loadExternalScripts(CDN_URLS);

//https://api.github.com/repos/cewekmurahan/cewekmurahan.github.io/contents/.mp4
class GitHubAPI {
  constructor(username, repository, file) {
    this.username = username;
    this.repository = repository;
    this.file = file;
    this.baseUrl = 'https://api.github.com/repos/';
    this.apiUrl = `${this.baseUrl}${this.username}/${this.repository}/contents/${this.file}`;
    this.dbName = 'cwkMrh';
    this.dbVersion = 1;
    this.storeName = 'mediaCwk';
  }

  fetchDataAndSaveToDB() {
    return new Promise((resolve, reject) => {
      fetch(this.apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Gagal mengambil data');
          }
          return response.json();
        })
        .then(data => {
          this.saveToIndexedDB(data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  saveToIndexedDB(data) {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onerror = (event) => {
      console.error('Gagal membuka database');
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('sha', 'sha', { unique: false });
      objectStore.createIndex('size', 'size', { unique: false });
      objectStore.createIndex('download_url', 'download_url', { unique: false });

      data.forEach(item => {
        const { name, sha, size, download_url } = item;
        objectStore.add({ name, sha, size, download_url });
      });
    };
  }

  getDataFromIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onerror = () => reject('Gagal membuka database');

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(this.storeName, 'readonly');
        const objectStore = transaction.objectStore(this.storeName);
        const getData = objectStore.getAll();

        getData.onsuccess = (event) => resolve(event.target.result);
        getData.onerror = () => reject('Gagal mengambil data dari IndexedDB');
      };
    });
  }
}

const gitHubData = new GitHubAPI('cewekmurahan', 'cewekmurahan.github.io', 'media');

function elem(allPages, page) {
  gitHubData.getDataFromIndexedDB()
    .then(data => {
      const videosPerPage = 5;
      const start = (page - 1) * videosPerPage;
      const end = start + videosPerPage;
      const videosData = data.slice(start, end);

      displayVideos(videosData);
      renderPagination(allPages, page);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayVideos(data) {
  const vdPlayer = document.querySelector('#videoContainer');
  let html = '';

  data.forEach(item => {
    const { name, sha, download_url } = item;

    html += `
      <div class='m-3'>
      <a href='/tv.html#${name}' targe='_blank'>
        <video id="player_${sha}" playsinline no-controls preload="metadata" controlsList="nodownload" oncontextmenu="return false;">
          <source src="${download_url}" type="video/mp4" />
        </video>
        </a>
      </div>
    `;
  });

  vdPlayer.innerHTML = html;

  // Konfigurasi video Plyr
  data.forEach(item => {
    const { sha } = item;
    const videoElement = document.getElementById(`player_${sha}`);
    const player = new Plyr(videoElement, {
      controls: ['play', 'progress', 'current-time', 'fullscreen'],
      hideControls: true,
      autoplay: false,
      clickToPlay: true,
    });
  });
}

function renderPagination(allPages, currentPage) {
  const ul = document.getElementById('pagination');
  let li = '';

  let beforePages = Math.max(1, currentPage - 1);
  let afterPages = Math.min(allPages, currentPage + 1);
  let liActive;

  if (currentPage > 1) {
    li += `<li class="page-item" onclick="elem(${allPages}, ${currentPage - 1})">
              <a class="page-link" tabindex="-1">
              <i class="ri-skip-left-line"></i>
              </a>
            </li>`;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    if (currentPage == pageLength) {
      liActive = 'active';
    } else {
      liActive = '';
    }

    li += `<li class="page-item ${liActive}" onclick="elem(${allPages}, ${pageLength})"><a class="page-link">${pageLength}</a></li>`;
  }

  if (currentPage < allPages) {
    li += `<li class="page-item" onclick="elem(${allPages}, ${currentPage + 1})">
              <a class="page-link">
              <i class="ri-skip-right-line"></i>
              </a>
            </li>`;
  }

  ul.innerHTML = li;
}

function extractDataProperties(data) {
  gitHubData.getDataFromIndexedDB()
    .then(data => {
      const totalVideos = data.length;
      const totalPages = Math.ceil(totalVideos / 5);
      elem(totalPages, 1);
    })
    .catch(error => {
      console.error(error);
    });
}

gitHubData.fetchDataAndSaveToDB()
  .then(data => {
    extractDataProperties(data);
  })
  .catch(error => {
    console.error(error);
  });
  
  