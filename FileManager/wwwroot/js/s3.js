var app = new Vue({
    el: '#fileMamager',
    data: {
        objects: [],
        bucketName: "",
        activeDirectory: "",
        inputFileName: "",
        inputFile: document.getElementById('inputFile'),
        modalInput: document.getElementById('modalInput'),
        modalFileUploader: document.getElementById('modalFileUploader'),
        fileUploaderItems: document.getElementById('fileUploaderItems'),
        blockAction: document.getElementById('action'),
        preloader: document.getElementById('Preloader'),
        activeAction: 0,
        allChecked: false,
        checkboxes: []
    },
    created() {
        this.getObjects();
    },
    mounted() {
        this.inputFile = document.getElementById('inputFile');
        this.modalInput = document.getElementById('modalInput');
        this.modalFileUploader = document.getElementById('modalFileUploader');
        this.fileUploaderItems = document.getElementById('fileUploaderItems');
        this.blockAction = document.getElementById('action');
        this.preloader = document.getElementById('preloader');

        this.inputFile.addEventListener('change', () => {
            this.fileUploaderItems.innerHTML = '';
            Array.from(this.inputFile.files).forEach((file) => {
                this.fileUploaderItems.innerHTML += `
                    <div class="file-uploader-item">
                        <div class="file-uploader-item-data" >
                            <div class="file-uploader-column column-icon icon-file"></div>
                            <div class="file-uploader-column column-name-file">${file.name}</div>
                            <div class="file-uploader-column column-progress">
                                <div class="icon-check"></div>
                            </div>
                        </div>
                    </div> `;
            });
        });
    },
    updated() {
        document.addEventListener('click', (event) => {
            if (this.blockAction.classList.contains('active')) {
                if (!event.target.closest('.btn-action')) {
                    this.hiddenBlockAction();
                }
            };
            if (event.target.classList.contains('modal')) {
                this.hiddenModal(event.target);
            };
        });
    },
    methods: {
        getObjects() {
            axios({
                method: 'GET',
                url: 'S3Manager/directories'
            })
                .then(response => {
                    this.bucketName = response.data.bucketName;
                    this.objects = response.data.directories;
                    this.hiddenModals();
                })
        },
        setActiveDirectory(directory) {
            this.activeDirectory = directory;
        },
        btnAction(element) {
            this.transformBlockAction(element);
            this.showBlockAction();
        },
        AddObjects(formData) {
            this.showPreloader();
            axios({
                method: 'POST',
                url: `S3Manager/object/add`,
                data: formData
            })
                .then(() => {
                    this.getObjects();
                    //this.hiddenPreloader();
                })
        },
        AploudedObject() {
            console.log("Vue AploudedObject");
        },
        DeleteObject() {
            this.allChecked = false;
            this.showPreloader();
            axios({
                method: 'DELETE',
                url: `S3Manager/object/delete`,
                data: {
                    objects: [this.activeDirectory]
                }
            })
                .then(() => {
                    this.getObjects();
                    this.hiddenPreloader();
                });
        },
        DeleteObjects() {
            this.allChecked = false;
            this.showPreloader();
            axios({
                method: 'DELETE',
                url: `S3Manager/object/delete`,
                data: {
                    objects: this.checkboxes
                }
            })
                .then(() => {
                    this.checkboxes = [];
                    this.getObjects();
                    this.hiddenPreloader();
                });
        },
        UpdateObject() {
            console.log("Vue UpdateObject");
        },
        CreateFolder() {
            this.showPreloader();
            axios({
                method: 'POST',
                url: `S3Manager/folder/create`,
                data: {
                    folderName: this.inputFileName
                }
            })
                .then(() => {
                    this.inputFileName = '';
                    this.getObjects();
                    this.hiddenPreloader();
                });
        },
        RenameObject() {
            this.showPreloader();
            axios({
                method: 'POST',
                url: `S3Manager/object/rename`,
                data: {
                    oldName: this.activeDirectory,
                    newName: this.inputFileName
                }
            })
                .then(() => {
                    this.inputFileName = '';
                    this.getObjects();
                    this.hiddenPreloader();
                });
        },
        submitFile() {
            try {
                const formData = new FormData();

                Array.from(this.inputFile.files).forEach((file) => {
                    formData.append('files', file)
                });

                this.AddObjects(formData);

                this.fileUploaderItems.innerHTML = '';
                this.inputFile.value = '';

                this.hiddenModals();
                this.showPreloader();
            }
            catch (e) {
                console.log(e);
            }
        },

        ApplyFileInput() {
            this.hiddenModalInput();
            switch (this.activeAction) {
                case 0:
                    this.CreateFolder();
                    break;
                case 1:
                    this.RenameObject();
                    break;
            }
        },
        CheckedAll() {
            if (this.allChecked) {
                this.checkboxes = this.objects.map(obj => obj.key);
            }
            else {
                this.checkboxes = [];
            }
        },
        CheckChecked() {
            if (this.objects.length != this.checkboxes.length) {
                this.allChecked = false;
            }
            else {
                this.allChecked = true;
            }
        },

        showModalInput(active = 0) {
            this.activeAction = active;
            if (active === 1) {
                this.inputFileName = this.activeDirectory;
            }
            this.showModal(this.modalInput);
        },
        hiddenModalInput() {
            this.hiddenModal(this.modalInput);
        },
        showModalFileUploader() {
            this.showModal(this.modalFileUploader);
        },
        hiddenModalFileUploader() {
            this.hiddenModal(this.modalFileUploader);
        },

        showModal(element) {
            element.classList.add('active');
        },
        hiddenModal(element) {
            element.classList.remove('active');
        },
        hiddenModals() {
            var modals = document.querySelectorAll('.modal');
            modals.forEach((modal) => {
                this.hiddenModal(modal);
            });
        },

        showPreloader() {
            this.showModal(this.preloader);
        },
        hiddenPreloader() {
            this.hiddenModals(this.preloader);
        },

        showBlockAction() {
            this.showModal(this.blockAction);
        },
        hiddenBlockAction() {
            this.hiddenModal(this.blockAction);
        },
        transformBlockAction(event) {
            let rect = event.target.closest('.btn-action').getBoundingClientRect();
            let left = rect.left - this.blockAction.offsetLeft;
            let top = rect.top;

            this.blockAction.style.transform = `translate(${left}px, ${top}px)`;
        }
    }
});
