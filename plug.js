/**
 * @name SpotifyControls
 * @author DevilBro
 * @authorId 278543574059057154
 * @version 1.1.5
 * @description Adds a Control Panel while listening to Spotify on a connected Account
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://mwittrien.github.io/
 * @source https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/SpotifyControls/
 * @updateUrl https://mwittrien.github.io/BetterDiscordAddons/Plugins/SpotifyControls/SpotifyControls.plugin.js
 */

module.exports = (_ => {
    const config = {
        "info": {
            "name": "SpotifyControls",
            "author": "DevilBro",
            "version": "1.1.5",
            "description": "Adds a Control Panel while listening to Spotify on a connected Account"
        },
        "changeLog": {
            "improved": {
                "Volume Slider": "Now updates live without having to release the Slider"
            }
        }
    };

    return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
        getName() { return config.info.name; }
        getAuthor() { return config.info.author; }
        getVersion() { return config.info.version; }
        getDescription() { return `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`; }

        downloadLibrary() {
            require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
                if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", { type: "success" }));
                else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
            });
        }

        load() {
            if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, { pluginQueue: [] });
            if (!window.BDFDB_Global.downloadModal) {
                window.BDFDB_Global.downloadModal = true;
                BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onCancel: _ => { delete window.BDFDB_Global.downloadModal; },
                    onConfirm: _ => {
                        delete window.BDFDB_Global.downloadModal;
                        this.downloadLibrary();
                    }
                });
            }
            if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
        }
        start() { this.load(); }
        stop() { }
        getSettingsPanel() {
            let template = document.createElement("template");
            template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
            template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
            return template.content.firstElementChild;
        }
    } : (([Plugin, BDFDB]) => {
        var _this;
        var controls;
        var starting, lastSong, currentVolume, lastVolume, stopTime, previousIsClicked, previousDoubleTimeout;
        var timelineTimeout, timelineDragging, updateInterval;
        var playbackState = {};

        const repeatStates = [
            "off",
            "context",
            "track"
        ];

        const SpotifyControlsComponent = class SpotifyControls extends BdApi.React.Component {
            componentDidMount() {
                controls = this;
            }
            request(socket, device, type, data) {
                return new Promise(callback => {
                    let method = "PUT";
                    switch (type) {
                        case "next":
                        case "previous":
                            method = "POST";
                            break;
                        case "get":
                            type = "";
                            method = "GET";
                            break;
                    };
                    BDFDB.LibraryRequires.request({
                        url: `https://api.spotify.com/v1/me/player${type ? "/" + type : ""}${Object.entries(Object.assign({}, data)).map(n => `?${n[0]}=${n[1]}`).join("")}`,
                        method: method,
                        headers: {
                            authorization: `Bearer ${socket.accessToken}`
                        }
                    }, (error, response, result) => {
                        if (response && response.statusCode == 401) {
                            BDFDB.LibraryModules.SpotifyUtils.getAccessToken(socket.accountId).then(promiseResult => {
                                let newSocketDevice = BDFDB.LibraryModules.SpotifyTrackUtils.getActiveSocketAndDevice();
                                this.request(newSocketDevice.socket, newSocketDevice.device, type, data).then(_ => {
                                    try { callback(JSON.parse(result)); }
                                    catch (err) { callback({}); }
                                });
                            });
                        }
                        else {
                            try { callback(JSON.parse(result)); }
                            catch (err) { callback({}); }
                        }
                    });
                });
            }
            render() {
                let socketDevice = BDFDB.LibraryModules.SpotifyTrackUtils.getActiveSocketAndDevice();
                if (!socketDevice) return null;
                if (this.props.song) {
                    playbackState.is_playing = true;
                    let fetchState = !BDFDB.equals(this.props.song, lastSong);
                    lastSong = this.props.song;
                    stopTime = null;
                    if (fetchState) this.request(socketDevice.socket, socketDevice.device, "get").then(response => {
                        playbackState = Object.assign({}, response);
                        BDFDB.ReactUtils.forceUpdate(this);
                    });
                }
                else if (!stopTime && lastSong) {
                    playbackState.is_playing = false;
                    stopTime = new Date();
                }
                if (!lastSong) return null;
                currentVolume = this.props.draggingVolume ? currentVolume : socketDevice.device.volume_percent;
                let playerSize = this.props.maximized ? "big" : "small";
                let coverSrc = BDFDB.LibraryModules.AssetUtils.getAssetImage(lastSong.application_id, lastSong.assets.large_image);
                return BDFDB.ReactUtils.createElement("div", {
                    className: BDFDB.DOMUtils.formatClassName(BDFDB.disCN._spotifycontrolscontainer, this.props.maximized && BDFDB.disCN._spotifycontrolscontainermaximized, this.props.timeline && BDFDB.disCN._spotifycontrolscontainerwithtimeline),
                    children: [
                        BDFDB.ReactUtils.createElement("div", {
                            className: BDFDB.disCN._spotifycontrolscontainerinner,
                            children: [
                                BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
                                    className: BDFDB.disCN._spotifycontrolscoverwrapper,
                                    onClick: _ => {
                                        this.props.maximized = !this.props.maximized;
                                        BDFDB.DataUtils.save(this.props.maximized, _this, "playerState", "maximized");
                                        if (this.props.maximized) this.request(socketDevice.socket, socketDevice.device, "get").then(response => {
                                            playbackState = Object.assign({}, response);
                                            BDFDB.ReactUtils.forceUpdate(this);
                                        });
                                        else BDFDB.ReactUtils.forceUpdate(this);
                                    },
                                    children: [
                                        coverSrc ? BDFDB.ReactUtils.createElement("img", {
                                            className: BDFDB.disCN._spotifycontrolscover,
                                            src: coverSrc
                                        }) : BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
                                            className: BDFDB.disCN._spotifycontrolscover,
                                            width: "100%",
                                            height: "100%",
                                            name: BDFDB.LibraryComponents.SvgIcon.Names.QUESTIONMARK_ACTIVITY
                                        }),
                                        BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
                                            className: BDFDB.disCN._spotifycontrolscovermaximizer,
                                            name: BDFDB.LibraryComponents.SvgIcon.Names.LEFT_CARET
                                        })
                                    ]
                                }),
                                BDFDB.ReactUtils.createElement("div", {
                                    className: BDFDB.disCN._spotifycontrolsdetails,
                                    children: [
                                        BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
                                            className: BDFDB.disCN._spotifycontrolssong,
                                            children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextScroller, {
                                                children: lastSong.details
                                            })
                                        }),
                                        BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
                                            className: BDFDB.disCNS.subtext + BDFDB.disCN._spotifycontrolsinterpret,
                                            color: BDFDB.LibraryComponents.TextElement.Colors.CUSTOM,
                                            size: BDFDB.LibraryComponents.TextElement.Sizes.SIZE_12,
                                            children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextScroller, {
                                                children: BDFDB.LanguageUtils.LanguageStringsFormat("USER_ACTIVITY_LISTENING_ARTISTS", lastSong.state)
                                            })
                                        })
                                    ]
                                }),
                                BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
                                    text: socketDevice.device.is_restricted ? _this.labels.restricted_device : null,
                                    tooltipConfig: { color: "red" },
                                    children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
                                        grow: 0,
                                        children: [
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "share",
                                                playerSize: playerSize,
                                                style: this.props.maximized ? { marginRight: 4 } : {},
                                                onClick: _ => {
                                                    let url = BDFDB.ObjectUtils.get(playbackState, "item.external_urls.spotify") || BDFDB.ObjectUtils.get(playbackState, "context.external_urls.spotify");
                                                    if (url) {
                                                        BDFDB.LibraryRequires.electron.clipboard.write({ text: url });
                                                        BDFDB.NotificationUtils.toast(_this.labels.toast_copyurl_success, { type: "success" });
                                                    }
                                                    else BDFDB.NotificationUtils.toast(_this.labels.toast_copyurl_fail, { type: "danger" });
                                                }
                                            }),
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "shuffle",
                                                playerSize: playerSize,
                                                active: playbackState.shuffle_state,
                                                disabled: socketDevice.device.is_restricted,
                                                onClick: _ => {
                                                    playbackState.shuffle_state = !playbackState.shuffle_state;
                                                    this.request(socketDevice.socket, socketDevice.device, "shuffle", {
                                                        state: playbackState.shuffle_state
                                                    });
                                                    BDFDB.ReactUtils.forceUpdate(this);
                                                }
                                            }),
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "previous",
                                                playerSize: playerSize,
                                                disabled: socketDevice.device.is_restricted,
                                                onClick: _ => {
                                                    if (previousIsClicked || !_this.settings.general.doubleBack) {
                                                        previousIsClicked = false;
                                                        this.request(socketDevice.socket, socketDevice.device, "previous");
                                                    }
                                                    else {
                                                        previousIsClicked = true;
                                                        previousDoubleTimeout = BDFDB.TimeUtils.timeout(_ => {
                                                            previousIsClicked = false;
                                                            this.request(socketDevice.socket, socketDevice.device, "seek", {
                                                                position_ms: 0
                                                            });
                                                        }, 300);
                                                    }
                                                }
                                            }),
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "pauseplay",
                                                playerSize: playerSize,
                                                icon: this.props.song ? 0 : 1,
                                                disabled: socketDevice.device.is_restricted,
                                                onClick: _ => {
                                                    if (this.props.song) {
                                                        playbackState.is_playing = false;
                                                        this.request(socketDevice.socket, socketDevice.device, "pause");
                                                    }
                                                    else {
                                                        playbackState.is_playing = true;
                                                        this.request(socketDevice.socket, socketDevice.device, "play");
                                                    }
                                                }
                                            }),
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "next",
                                                playerSize: playerSize,
                                                disabled: socketDevice.device.is_restricted,
                                                onClick: _ => {
                                                    this.request(socketDevice.socket, socketDevice.device, "next");
                                                }
                                            }),
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "repeat",
                                                playerSize: playerSize,
                                                icon: playbackState.repeat_state != repeatStates[2] ? 0 : 1,
                                                active: playbackState.repeat_state != repeatStates[0],
                                                disabled: socketDevice.device.is_restricted,
                                                onClick: _ => {
                                                    playbackState.repeat_state = repeatStates[repeatStates.indexOf(playbackState.repeat_state) + 1] || repeatStates[0];
                                                    this.request(socketDevice.socket, socketDevice.device, "repeat", {
                                                        state: playbackState.repeat_state
                                                    });
                                                    BDFDB.ReactUtils.forceUpdate(this);
                                                }
                                            }),
                                            BDFDB.ReactUtils.createElement(SpotifyControlsButtonComponent, {
                                                type: "volume",
                                                playerSize: playerSize,
                                                icon: Math.ceil(currentVolume / 34),
                                                disabled: socketDevice.device.is_restricted,
                                                style: this.props.maximized ? { marginLeft: 4 } : {},
                                                onContextMenu: _ => {
                                                    if (currentVolume == 0) {
                                                        if (lastVolume) this.request(socketDevice.socket, socketDevice.device, "volume", {
                                                            volume_percent: lastVolume
                                                        });
                                                    }
                                                    else {
                                                        lastVolume = currentVolume;
                                                        this.request(socketDevice.socket, socketDevice.device, "volume", {
                                                            volume_percent: 0
                                                        });
                                                    }
                                                },
                                                renderPopout: instance => {
                                                    let changeTimeout;
                                                    return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Slider, {
                                                        className: BDFDB.disCN._spotifycontrolsvolumeslider,
                                                        defaultValue: currentVolume,
                                                        digits: 0,
                                                        barStyles: { height: 6, top: 3 },
                                                        fillStyles: { backgroundColor: BDFDB.DiscordConstants.Colors.SPOTIFY },
                                                        onValueRender: value => {
                                                            this.props.draggingVolume = true;
                                                            currentVolume = value;
                                                            BDFDB.TimeUtils.clear(changeTimeout);
                                                            changeTimeout = BDFDB.TimeUtils.timeout(_ => this.props.draggingVolume && this.request(socketDevice.socket, socketDevice.device, "volume", {
                                                                volume_percent: currentVolume
                                                            }), 500);
                                                            return value + "%";
                                                        },
                                                        onValueChange: value => {
                                                            this.props.draggingVolume = false;
                                                            currentVolume = value;
                                                            this.request(socketDevice.socket, socketDevice.device, "volume", {
                                                                volume_percent: currentVolume
                                                            });
                                                        }
                                                    });
                                                }
                                            })
                                        ].filter(n => n)
                                    })
                                })
                            ]
                        }),
                        this.props.timeline && BDFDB.ReactUtils.createElement(SpotifyControlsTimelineComponent, {
                            song: lastSong,
                            socket: socketDevice.socket,
                            device: socketDevice.device,
                            controls: this
                        })
                    ].filter(n => n)
                });
            }
        };
        const SpotifyControlsButtonComponent = class SpotifyControlsButton extends BdApi.React.Component {
            render() {
                if (!this.props.playerSize || !_this.settings.buttons[this.props.type] || !_this.settings.buttons[this.props.type][this.props.playerSize]) return null;
                let button = BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Button, BDFDB.ObjectUtils.exclude(Object.assign({}, this.props, {
                    className: BDFDB.DOMUtils.formatClassName(BDFDB.disCN.accountinfobutton, this.props.disabled ? BDFDB.disCN.accountinfobuttondisabled : BDFDB.disCN.accountinfobuttonenabled, this.props.active && BDFDB.disCN._spotifycontrolsbuttonactive),
                    look: BDFDB.LibraryComponents.Button.Looks.BLANK,
                    size: BDFDB.LibraryComponents.Button.Sizes.NONE,
                    children: _this.defaults.buttons[this.props.type] && _this.defaults.buttons[this.props.type].icons ? (_this.defaults.buttons[this.props.type].icons[this.props.icon] || _this.defaults.buttons[this.props.type].icons[0]) : "?",
                    onClick: this.props.disabled ? _ => { } : this.props.onClick,
                    onContextMenu: this.props.disabled ? _ => { } : this.props.onContextMenu,
                }), "active", "disabled", "renderPopout", "icon", "type", "playerSize"));
                return !this.props.disabled && typeof this.props.renderPopout == "function" ? BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.PopoutContainer, {
                    children: button,
                    animation: BDFDB.LibraryComponents.PopoutContainer.Animation.SCALE,
                    position: BDFDB.LibraryComponents.PopoutContainer.Positions.TOP,
                    align: BDFDB.LibraryComponents.PopoutContainer.Align.CENTER,
                    arrow: true,
                    shadow: true,
                    renderPopout: this.props.renderPopout
                }) : button;
            }
        };
        const SpotifyControlsTimelineComponent = class SpotifyControlsTimeline extends BdApi.React.Component {
            componentDidMount() {
                BDFDB.TimeUtils.clear(updateInterval);
                updateInterval = BDFDB.TimeUtils.interval(_ => {
                    if (!this.updater || typeof this.updater.isMounted != "function" || !this.updater.isMounted(this)) BDFDB.TimeUtils.clear(updateInterval);
                    else if (playbackState.is_playing) {
                        let song = BDFDB.LibraryModules.SpotifyTrackUtils.getActivity(false);
                        if (!song) BDFDB.ReactUtils.forceUpdate(controls);
                        else if (playbackState.is_playing) BDFDB.ReactUtils.forceUpdate(this);
                    }
                }, 1000);
            }
            formatTime(time) {
                let seconds = Math.floor((time / 1000) % 60);
                let minutes = Math.floor((time / (1000 * 60)) % 60);
                let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
                return `${hours > 0 ? hours + ":" : ""}${hours > 0 && minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
            }
            render() {
                let maxTime = this.props.song.timestamps.end - this.props.song.timestamps.start;
                let currentTime = (!playbackState.is_playing && stopTime ? stopTime : new Date()) - this.props.song.timestamps.start;
                currentTime = currentTime > maxTime ? maxTime : currentTime;
                return BDFDB.ReactUtils.createElement("div", {
                    className: BDFDB.disCN._spotifycontrolstimeline,
                    children: [
                        BDFDB.ReactUtils.createElement("div", {
                            className: BDFDB.disCN._spotifycontrolsbar,
                            children: [
                                BDFDB.ReactUtils.createElement("div", {
                                    className: BDFDB.disCN._spotifycontrolsbarfill,
                                    style: { width: `${currentTime / maxTime * 100}%` }
                                }),
                                BDFDB.ReactUtils.createElement("div", {
                                    className: BDFDB.disCN._spotifycontrolsbargrabber,
                                    style: { left: `${currentTime / maxTime * 100}%` }
                                })
                            ],
                            onClick: event => {
                                let rects = BDFDB.DOMUtils.getRects(BDFDB.DOMUtils.getParent(BDFDB.dotCN._spotifycontrolsbar, event.target));
                                this.props.controls.request(this.props.socket, this.props.device, "seek", {
                                    position_ms: Math.round(BDFDB.NumberUtils.mapRange([rects.left, rects.left + rects.width], [0, maxTime], event.clientX))
                                });
                            }
                        }),
                        BDFDB.ReactUtils.createElement("div", {
                            className: BDFDB.disCN._spotifycontrolsbartext,
                            children: [
                                BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
                                    className: BDFDB.disCN.height12,
                                    size: BDFDB.LibraryComponents.TextElement.Sizes.SIZE_12,
                                    children: this.formatTime(currentTime)
                                }),
                                BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
                                    className: BDFDB.disCN.height12,
                                    size: BDFDB.LibraryComponents.TextElement.Sizes.SIZE_12,
                                    children: this.formatTime(maxTime)
                                })
                            ]
                        })
                    ]
                });
            }
        };

        return class SpotifyControls extends Plugin {
            onLoad() {
                _this = this;

                this.defaults = {
                    general: {
                        addTimeline: { value: true, description: "Show the Song Timeline in the Controls" },
                        doubleBack: { value: true, description: "Requires the User to press the Back Button twice to go to previous Track" }
                    },
                    buttons: {
                        share: { value: { small: false, big: true }, icons: ["🔗"], description: "Share" },
                        shuffle: { value: { small: false, big: true }, icons: ["⇄"], description: "Shuffle" },
                        previous: { value: { small: true, big: true }, icons: ["↞"], description: "Previous" },
                        pauseplay: { value: { small: true, big: true }, icons: ["❚❚", "▶"], description: "Pause/Play" },
                        next: { value: { small: true, big: true }, icons: ["↠"], description: "Next" },
                        repeat: { value: { small: false, big: true }, icons: ["↺", "•"], description: "Repeat" },
                        volume: { value: { small: false, big: true }, icons: ["X", "🔈", "🔉", "🔊"], description: "Volume" }
                    }
                };

                this.patchedModules = {
                    after: {
                        AppView: "default"
                    }
                };


                this.css = `
					@font-face {
						font-family: glue1-spoticon;
						src: url("https://mwittrien.github.io/BetterDiscordAddons/Plugins/SpotifyControls/_res/spoticon.ttf") format("truetype");
						font-weight: 400;
						font-style: normal
					}
					${BDFDB.dotCN._spotifycontrolscontainer} {
						display: flex;
						flex-direction: column;
						justify-content: center;
						min-height: 52px;
						margin-bottom: 1px;
						border-bottom: 1px solid var(--background-modifier-accent);
						padding: 0 8px;
						box-sizing: border-box;
					}
					${BDFDB.dotCN._spotifycontrolscontainer + BDFDB.dotCN._spotifycontrolscontainerwithtimeline} {
						padding-top: 8px;
					}
					${BDFDB.dotCN._spotifycontrolscontainerinner} {
						display: flex;
						align-items: center;
						font-size: 14px;
						width: 100%;
					}
					${BDFDB.dotCN._spotifycontrolstimeline} {
						margin: 6px 0 4px 0;
					}
					${BDFDB.dotCN._spotifycontrolsbar} {
						position: relative;
						border-radius: 2px;
						background-color: rgba(79, 84, 92, 0.16);
						height: 4px;
						margin-bottom: 4px;
					}
					${BDFDB.dotCN._spotifycontrolsbarfill} {
						border-radius: 2px;
						height: 100%;
						min-width: 4px;
						border-radius: 2px;
						background: var(--text-normal);
					}
					${BDFDB.dotCN._spotifycontrolstimeline}:hover ${BDFDB.dotCN._spotifycontrolsbarfill} {
						background: ${BDFDB.DiscordConstants.Colors.SPOTIFY};
					}
					${BDFDB.dotCN._spotifycontrolsbargrabber} {
						display: none;
						position: absolute;
						top: 0;
						left: 0;
						width: 8px;
						height: 8px;
						margin-top: -2px;
						margin-left: -2px;
						background: var(--text-normal);
						border-radius: 50%;
					}
					${BDFDB.dotCN._spotifycontrolstimeline}:hover ${BDFDB.dotCN._spotifycontrolsbargrabber} {
						display: block;
					}
					${BDFDB.dotCN._spotifycontrolsbartext} {
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					${BDFDB.dotCN._spotifycontrolscoverwrapper} {
						position: relative;
						width: 32px;
						min-width: 32px;
						height: 32px;
						min-height: 32px;
						margin-right: 8px;
						border-radius: 4px;
						overflow: hidden;
						transition: width .3s ease, height .3s ease;
					}
					${BDFDB.dotCN._spotifycontrolscover} {
						display: block;
						width: 100%;
						height: 100%;
						color: var(--header-primary);
						object-fit: cover;
					}
					${BDFDB.dotCN._spotifycontrolscovermaximizer} {
						visibility: hidden;
						position: absolute;
						background-color: rgba(0, 0, 0, 0.5);
						color: rgba(255, 255, 255, 0.5);
						top: 0;
						right: 0;
						border-radius: 50%;
						width: 12px;
						height: 12px;
						padding: 3px;
						transform: rotate(90deg);
						transition: width .3s ease, height .3s ease, transform .3s ease;
						pointer-events: none;
					}
					${BDFDB.dotCN._spotifycontrolscoverwrapper}:hover ${BDFDB.dotCN._spotifycontrolscovermaximizer} {
						visibility: visible;
					}
					${BDFDB.dotCN._spotifycontrolsdetails} {
						user-select: text;
						flex-grow: 1;
						margin-right: 4px;
						min-width: 0;
					}
					${BDFDB.dotCN._spotifycontrolssong} {
						font-weight: 500;
					}
					${BDFDB.dotCN._spotifycontrolsinterpret} {
						font-weight: 300;
					}
					${BDFDB.dotCN._spotifycontrolsvolumeslider} {
						height: 12px;
						width: 140px;
						margin: 5px;
					}
					${BDFDB.dotCNS._spotifycontrolsvolumeslider + BDFDB.dotCN.slidergrabber} {
						height: 10px;
						margin-top: -6px;
						border-radius: 50%;
					}
					${BDFDB.dotCNS._spotifycontrolscontainer + BDFDB.dotCN.accountinfobuttondisabled} {
						cursor: no-drop;
					}
					${BDFDB.dotCNS._spotifycontrolscontainer + BDFDB.dotCNS.accountinfobutton + BDFDB.dotCN.buttoncontents} {
						font-family: glue1-spoticon !important;
					}
					${BDFDB.dotCNS._spotifycontrolscontainer + BDFDB.dotCN.accountinfobutton + BDFDB.dotCN._spotifycontrolsbuttonactive} {
						color: ${BDFDB.DiscordConstants.Colors.SPOTIFY};
					}
					${BDFDB.dotCN._spotifycontrolscontainer + BDFDB.dotCN._spotifycontrolscontainermaximized} {
						padding-top: 0;
					}
					${BDFDB.dotCN._spotifycontrolscontainer + BDFDB.dotCNS._spotifycontrolscontainermaximized + BDFDB.dotCN._spotifycontrolscontainerinner} {
						flex-direction: column;
					}
					${BDFDB.dotCN._spotifycontrolscontainer + BDFDB.dotCNS._spotifycontrolscontainermaximized + BDFDB.dotCN._spotifycontrolsdetails} {
						margin: 0 0 4px 0;
						width: 100%;
						text-align: center;
					}
					${BDFDB.dotCN._spotifycontrolscontainer + BDFDB.dotCNS._spotifycontrolscontainermaximized + BDFDB.dotCN._spotifycontrolscoverwrapper} {
						width: calc(100% + 16px);
						height: 100%;
						margin: 0 0 8px 0;
						border-radius: 0;
					}
					${BDFDB.dotCN._spotifycontrolscontainer + BDFDB.dotCNS._spotifycontrolscontainermaximized + BDFDB.dotCN._spotifycontrolscovermaximizer} {
						top: 4px;
						right: 4px;
						width: 22px;
						height: 22px;
						padding: 5px;
						transform: rotate(-90deg);
					}
					${BDFDB.dotCN._spotifycontrolssettingsicon} {
						margin: 4px;
						font-size: 16px;
						font-family: glue1-spoticon !important;
					}
					${BDFDB.dotCN._spotifycontrolssettingslabel} {
						margin-left: 10px;
					}
					${BDFDB.dotCNS._bdminimalmode + BDFDB.dotCN._spotifycontrolsbar} {
						height: 3px;
					}
					${BDFDB.dotCNS._bdminimalmode + BDFDB.dotCNS._spotifycontrolscontainer + BDFDB.dotCN.accountinfobutton} {
						width: 26px;
						height: 26px;
					}
					${BDFDB.dotCNS._bdminimalmode + BDFDB.dotCNS._spotifycontrolscontainer + BDFDB.dotCN.size14} {
						font-size: 13px;
						line-height: 13px;
					}
					${BDFDB.dotCNS._bdminimalmode + BDFDB.dotCNS._spotifycontrolscontainer + BDFDB.dotCN.size12} {
						font-size: 11px;
						line-height: 11px;
					}
				`;
            }

            onStart() {
                // REMOVE 24.04.2021
                let oldData = BDFDB.DataUtils.load(this);
                if (oldData.settings) {
                    this.settings.general = oldData.settings;
                    BDFDB.DataUtils.save(this.settings.general, this, "general");
                    BDFDB.DataUtils.remove(this, "settings");
                }
                if (oldData.buttonConfigs) {
                    this.settings.buttons = oldData.buttonConfigs;
                    BDFDB.DataUtils.save(this.settings.buttons, this, "buttons");
                    BDFDB.DataUtils.remove(this, "buttonConfigs");
                }

                BDFDB.PatchUtils.patch(this, BDFDB.LibraryModules.SpotifyTrackUtils, "getActivity", {
                    after: e => {
                        if (e.methodArguments[0] !== false) {
                            if (e.returnValue && e.returnValue.name == "Spotify") this.updatePlayer(e.returnValue);
                            else if (!e.returnValue) this.updatePlayer(null);
                        }
                    }
                });

                BDFDB.PatchUtils.patch(this, BDFDB.LibraryModules.SpotifyTrackUtils, "wasAutoPaused", {
                    instead: e => {
                        return false;
                    }
                });

                BDFDB.PatchUtils.patch(this, BDFDB.LibraryModules.SpotifyUtils, "pause", {
                    instead: e => {
                        return false;
                    }
                });

                this.forceUpdateAll();
            }

            onStop() {
                this.forceUpdateAll();
            }

            getSettingsPanel(collapseStates = {}) {
                let settingsPanel;
                return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, {
                    collapseStates: collapseStates,
                    children: _ => {
                        let settingsItems = [];

                        if (!BDFDB.LibraryModules.SpotifyTrackUtils.hasConnectedAccount()) BDFDB.ModalUtils.open(this, {
                            size: "SMALL",
                            header: `${this.name}: ${this.labels.noaccount_header}...`,
                            subHeader: this.labels.noaccount_subheader,
                            text: this.labels.noaccount_text,
                            buttons: [{
                                contents: BDFDB.LanguageUtils.LanguageStrings.CONNECT,
                                color: "BRAND",
                                close: true,
                                onClick: _ => BDFDB.LibraryModules.UserSettingsUtils.open(BDFDB.DiscordConstants.UserSettingsSections.CONNECTIONS)
                            }]
                        });

                        settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.CollapseContainer, {
                            title: "Settings",
                            collapseStates: collapseStates,
                            children: Object.keys(this.defaults.general).map(key => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
                                type: "Switch",
                                plugin: this,
                                keys: ["general", key],
                                label: this.defaults.general[key].description,
                                value: this.settings.general[key]
                            }))
                        }));

                        settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.CollapseContainer, {
                            title: "Button Settings",
                            collapseStates: collapseStates,
                            children: [BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.FormComponents.FormTitle, {
                                className: BDFDB.disCN.marginbottom4,
                                tag: BDFDB.LibraryComponents.FormComponents.FormTitle.Tags.H3,
                                children: "Add control Buttons in small and/or big Player Version: "
                            })].concat(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsList, {
                                settings: Object.keys(this.defaults.buttons[Object.keys(this.defaults.buttons)[0]].value),
                                data: Object.keys(this.defaults.buttons).map(key => Object.assign({}, this.settings.buttons[key], {
                                    key: key,
                                    label: this.defaults.buttons[key].description,
                                    icons: this.defaults.buttons[key].icons
                                })),
                                noRemove: true,
                                renderLabel: data => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
                                    align: BDFDB.LibraryComponents.Flex.Align.CENTER,
                                    children: [
                                        BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
                                            justify: BDFDB.LibraryComponents.Flex.Justify.CENTER,
                                            wrap: BDFDB.LibraryComponents.Flex.Wrap.WRAP,
                                            basis: 50,
                                            grow: 0,
                                            children: data.icons.map(icon => BDFDB.ReactUtils.createElement("div", {
                                                className: BDFDB.disCN._spotifycontrolssettingsicon,
                                                children: icon
                                            }))
                                        }),
                                        BDFDB.ReactUtils.createElement("div", {
                                            className: BDFDB.disCN._spotifycontrolssettingslabel,
                                            children: data.label
                                        })
                                    ]
                                }),
                                onCheckboxChange: (value, instance) => {
                                    this.settings.buttons[instance.props.cardId][instance.props.settingId] = value;
                                    BDFDB.DataUtils.save(this.settings.buttons, this, "buttons");
                                    this.SettingsUpdated = true;
                                }
                            }))
                        }));

                        return settingsItems;
                    }
                });
            }

            onSettingsClosed() {
                if (this.SettingsUpdated) {
                    delete this.SettingsUpdated;
                    this.forceUpdateAll();
                }
            }

            forceUpdateAll() {
                BDFDB.PatchUtils.forceAllUpdates(this);
                BDFDB.DiscordUtils.rerenderAll();
            }

            processAppView(e) {
                let injected = this.injectPlayer(e.returnvalue);
                if (!injected) {
                    let channels = BDFDB.ReactUtils.findChild(e.returnvalue, { name: "ChannelSidebar" });
                    if (channels) {
                        let type = channels.type;
                        channels.type = (...args) => {
                            let appliedType = type(...args);
                            this.injectPlayer(appliedType);
                            return appliedType;
                        };
                    }
                }
            }

            injectPlayer(parent) {
                let [children, index] = BDFDB.ReactUtils.findParent(parent, { props: [["section", BDFDB.DiscordConstants.AnalyticsSections.ACCOUNT_PANEL]] });
                if (index > -1) children.splice(index - 1, 0, BDFDB.ReactUtils.createElement(SpotifyControlsComponent, {
                    song: BDFDB.LibraryModules.SpotifyTrackUtils.getActivity(false),
                    maximized: BDFDB.DataUtils.load(this, "playerState", "maximized"),
                    timeline: this.settings.general.addTimeline
                }, true));
                return index > -1;
            }

            updatePlayer(song) {
                if (controls) {
                    controls.props.song = song;
                    BDFDB.ReactUtils.forceUpdate(controls);
                }
            }

            setLabelsByLanguage() {
                switch (BDFDB.LanguageUtils.getLanguage().id) {
                    case "bg":		// Bulgarian
                        return {
                            noaccount_header: "Нещо липсва",
                            noaccount_subheader: "Трябва да свържете акаунт в Spotify",
                            noaccount_text: "Липсва ви свързан акаунт в Spotify, без акаунт няма да можете да използвате Spotify Controls. За да свържете акаунт в Spotify с вашия акаунт в Discord, кликнете върху бутона по-долу.",
                            restricted_device: "Не може да контролира Spotify, докато възпроизвежда музика на ограничено устройство",
                            toast_copyurl_fail: "URL адресът на песента не може да бъде копиран в клипборда",
                            toast_copyurl_success: "URL адресът на песента беше копиран в клипборда"
                        };
                    case "da":		// Danish
                        return {
                            noaccount_header: "Noget mangler",
                            noaccount_subheader: "Du skal oprette forbindelse til en Spotify-konto",
                            noaccount_text: "Du mangler en tilsluttet Spotify-konto, uden en konto kan du ikke bruge Spotify Controls. For at forbinde en Spotify-konto med din Discord-konto skal du klikke på knappen nedenfor.",
                            restricted_device: "Kan ikke kontrollere Spotify, mens du spiller musik på en begrænset enhed",
                            toast_copyurl_fail: "Sang-URL kunne ikke kopieres til udklipsholderen",
                            toast_copyurl_success: "Sang-URL blev kopieret til udklipsholderen"
                        };
                    case "de":		// German
                        return {
                            noaccount_header: "Etwas fehlt",
                            noaccount_subheader: "Sie müssen ein Spotify-Konto verbinden",
                            noaccount_text: "Ihnen fehlt ein verbundenes Spotify-Konto. Ohne ein Konto können Sie Spotify Controls nicht verwenden. Um ein Spotify-Konto mit Ihrem Discord-Konto zu verbinden, klicken Sie auf die Schaltfläche unten.",
                            restricted_device: "Spotify  kann nicht gesteuert werden, während Musik auf einem eingeschränkten Gerät abgespielt wird",
                            toast_copyurl_fail: "Die Song-URL konnte nicht in die Zwischenablage kopiert werden",
                            toast_copyurl_success: "Die Song-URL wurde in die Zwischenablage kopiert"
                        };
                    case "el":		// Greek
                        return {
                            noaccount_header: "Κάτι λείπει",
                            noaccount_subheader: "Πρέπει να συνδέσετε έναν λογαριασμό Spotify",
                            noaccount_text: "Λείπει ένας συνδεδεμένος λογαριασμός Spotify, χωρίς λογαριασμό δεν θα μπορείτε να χρησιμοποιήσετε το Spotify Controls. Για να συνδέσετε έναν λογαριασμό Spotify με τον λογαριασμό σας Discord κάντε κλικ στο παρακάτω κουμπί.",
                            restricted_device: "Δεν είναι δυνατή ο έλεγχος του Spotify κατά την αναπαραγωγή μουσικής σε περιορισμένη συσκευή",
                            toast_copyurl_fail: "Δεν ήταν δυνατή η αντιγραφή του URL τραγουδιού στο πρόχειρο",
                            toast_copyurl_success: "Η διεύθυνση URL του τραγουδιού αντιγράφηκε στο πρόχειρο"
                        };
                    case "es":		// Spanish
                        return {
                            noaccount_header: "Algo falta",
                            noaccount_subheader: "Necesitas conectar una cuenta de Spotify",
                            noaccount_text: "Falta una cuenta de Spotify conectada, sin una cuenta no podrá usar Spotify Controls. Para conectar una cuenta de Spotify con su cuenta de Discord, haga clic en el botón de abajo.",
                            restricted_device: "No se puede controlar Spotify mientras se reproduce música en un dispositivo restringido",
                            toast_copyurl_fail: "No se pudo copiar la URL de la canción al portapapeles",
                            toast_copyurl_success: "La URL de la canción se copió al portapapeles"
                        };
                    case "fi":		// Finnish
                        return {
                            noaccount_header: "Jotain puuttuu",
                            noaccount_subheader: "Sinun on yhdistettävä Spotify-tili",
                            noaccount_text: "Sinulta puuttuu yhdistetty Spotify-tili. Ilman tiliä et voi käyttää Spotify Controls. Yhdistä Spotify-tili Discord-tili napsauttamalla alla olevaa painiketta.",
                            restricted_device: "Spotify ä ei voi hallita musiikkia toistettaessa rajoitetulla laitteella",
                            toast_copyurl_fail: "Kappaleen URL-osoitetta ei voitu kopioida leikepöydälle",
                            toast_copyurl_success: "Kappaleen URL-osoite kopioitiin leikepöydälle"
                        };
                    case "fr":		// French
                        return {
                            noaccount_header: "Quelque chose manque",
                            noaccount_subheader: "Vous devez connecter un compte Spotify",
                            noaccount_text: "Il vous manque un compte Spotify connecté, sans compte, vous ne pourrez pas utiliser Spotify Controls. Pour connecter un compte Spotify à votre compte Discord, cliquez sur le bouton ci-dessous.",
                            restricted_device: "Impossible de contrôler Spotify lors de la lecture de musique sur un appareil restreint",
                            toast_copyurl_fail: "L'URL de la chanson n'a pas pu être copiée dans le presse-papiers",
                            toast_copyurl_success: "L'URL de la chanson a été copiée dans le presse-papiers"
                        };
                    case "hr":		// Croatian
                        return {
                            noaccount_header: "Nešto nedostaje",
                            noaccount_subheader: "Morate povezati Spotify račun",
                            noaccount_text: "Nedostaje vam povezani Spotify račun, bez računa nećete moći koristiti Spotify Controls. Da biste povezali Spotify račun sa svojim Discord računom, kliknite gumb u nastavku.",
                            restricted_device: "Ne može kontrolirati Spotify tijekom reprodukcije glazbe na ograničenom uređaju",
                            toast_copyurl_fail: "URL pjesme nije se mogao kopirati u međuspremnik",
                            toast_copyurl_success: "URL pjesme kopiran je u međuspremnik"
                        };
                    case "hu":		// Hungarian
                        return {
                            noaccount_header: "Valami hiányzik",
                            noaccount_subheader: "Csatlakoztatnia kell egy Spotify-fiókot",
                            noaccount_text: "Hiányzik egy csatlakoztatott Spotify-fiók, fiók nélkül nem fogja tudni használni a Spotify Controls szolgáltatást. Ha Spotify-fiókot szeretne összekapcsolni Discord-fiókot, kattintson az alábbi gombra.",
                            restricted_device: "Nem lehet irányítani a Spotify szolgáltatást, miközben zenét játszik le korlátozott eszközön",
                            toast_copyurl_fail: "A dal URL-jét nem sikerült átmásolni a vágólapra",
                            toast_copyurl_success: "A dal URL-jét a vágólapra másolta"
                        };
                    case "it":		// Italian
                        return {
                            noaccount_header: "Manca qualcosa",
                            noaccount_subheader: "Devi collegare un account Spotify",
                            noaccount_text: "Ti manca un account Spotify collegato, senza un account non sarai in grado di utilizzare Spotify Controls. Per collegare un account Spotify al tuo account Discord, fai clic sul pulsante in basso.",
                            restricted_device: "Non è possibile controllare Spotify durante la riproduzione di musica su un dispositivo limitato",
                            toast_copyurl_fail: "L'URL del brano non può essere copiato negli appunti",
                            toast_copyurl_success: "L'URL del brano è stato copiato negli appunti"
                        };
                    case "ja":		// Japanese
                        return {
                            noaccount_header: "何かが欠けています",
                            noaccount_subheader: "Spotify アカウントを接続する必要があります",
                            noaccount_text: "接続されている Spotify アカウントがありません。アカウントがないと、 Spotify Controls を使用できません。 Spotify アカウントを Discord アカウントに接続するには、下のボタンをクリックしてください。",
                            restricted_device: "制限されたデバイスで音楽を再生している間は Spotify を制御できません",
                            toast_copyurl_fail: "曲のURLをクリップボードにコピーできませんでした",
                            toast_copyurl_success: "曲のURLがクリップボードにコピーされました"
                        };
                    case "ko":		// Korean
                        return {
                            noaccount_header: "무언가가 빠졌어",
                            noaccount_subheader: "Spotify  계정을 연결해야합니다",
                            noaccount_text: "연결된 Spotify 계정이 없습니다. 계정이 없으면 Spotify Controls 을 사용할 수 없습니다. Spotify 계정을 Discord 계정과 연결하려면 아래 버튼을 클릭하세요.",
                            restricted_device: "제한된 장치에서 음악을 재생하는 동안 Spotify 를 제어 할 수 없습니다.",
                            toast_copyurl_fail: "노래 URL을 클립 보드에 복사 할 수 없습니다.",
                            toast_copyurl_success: "노래 URL이 클립 보드에 복사되었습니다. "
                        };
                    case "lt":		// Lithuanian
                        return {
                            noaccount_header: "Kažko trūksta",
                            noaccount_subheader: "Turite prijungti „ Spotify “ paskyrą",
                            noaccount_text: "Trūksta prijungtos „ Spotify “ paskyros, be paskyros negalėsite naudoti Spotify Controls. Norėdami susieti „ Spotify “ paskyrą su Discord paskyra, spustelėkite toliau pateiktą mygtuką.",
                            restricted_device: "Nepavyksta valdyti „ Spotify “ grojant muziką ribotame įrenginyje",
                            toast_copyurl_fail: "Dainos URL nepavyko nukopijuoti į iškarpinę",
                            toast_copyurl_success: "Dainos URL buvo nukopijuotas į iškarpinę"
                        };
                    case "nl":		// Dutch
                        return {
                            noaccount_header: "Er mist iets",
                            noaccount_subheader: "U moet een Spotify-account verbinden",
                            noaccount_text: "U mist een verbonden Spotify-account. Zonder account kunt u Spotify Controls niet gebruiken. Om een Spotify-account aan uw Discord-account te koppelen, klikt u op de onderstaande knop.",
                            restricted_device: "Kan Spotify niet bedienen tijdens het afspelen van muziek op een beperkt apparaat",
                            toast_copyurl_fail: "Nummer-URL kan niet naar klembord worden gekopieerd",
                            toast_copyurl_success: "Nummer-URL is naar klembord gekopieerd"
                        };
                    case "no":		// Norwegian
                        return {
                            noaccount_header: "Noe mangler",
                            noaccount_subheader: "Du må koble til en Spotify-konto",
                            noaccount_text: "Du mangler en tilkoblet Spotify-konto, uten en konto kan du ikke bruke Spotify Controls. For å koble en Spotify-konto til Discord-konto din, klikk på knappen nedenfor.",
                            restricted_device: "Kan ikke kontrollere Spotify mens du spiller musikk på begrenset enhet",
                            toast_copyurl_fail: "Sangens URL kunne ikke kopieres til utklippstavlen",
                            toast_copyurl_success: "Sang-URL ble kopiert til utklippstavlen"
                        };
                    case "pl":		// Polish
                        return {
                            noaccount_header: "Czegoś brakuje",
                            noaccount_subheader: "Musisz połączyć konto Spotify",
                            noaccount_text: "Brakuje połączonego konta Spotify, bez konta nie będziesz mógł korzystać z Spotify Controls. Aby połączyć konto Spotify z kontem Discord, kliknij przycisk poniżej.",
                            restricted_device: "Nie można sterować Spotify podczas odtwarzania muzyki na urządzeniu z ograniczeniami",
                            toast_copyurl_fail: "Nie udało się skopiować adresu URL utworu do schowka",
                            toast_copyurl_success: "URL utworu został skopiowany do schowka"
                        };
                    case "pt-BR":	// Portuguese (Brazil)
                        return {
                            noaccount_header: "Algo está faltando",
                            noaccount_subheader: "Você precisa conectar uma conta Spotify",
                            noaccount_text: "Está faltando uma conta Spotify conectada, sem uma conta você não poderá usar Spotify Controls. Para conectar uma conta Spotify à sua conta Discord, clique no botão abaixo.",
                            restricted_device: "Não é possível controlar o Spotify enquanto reproduz música em dispositivo restrito",
                            toast_copyurl_fail: "O URL da música não pôde ser copiado para a área de transferência",
                            toast_copyurl_success: "O URL da música foi copiado para a área de transferência"
                        };
                    case "ro":		// Romanian
                        return {
                            noaccount_header: "Ceva lipseste",
                            noaccount_subheader: "Trebuie să vă conectați un cont Spotify",
                            noaccount_text: "Vă lipsește un cont Spotify conectat, fără un cont pe care nu îl veți putea folosi Spotify Controls. Pentru a conecta un cont Spotify la contul dvs. Discord faceți clic pe butonul de mai jos.",
                            restricted_device: "Nu pot controla Spotify în timp ce redați muzică pe dispozitiv restricționat",
                            toast_copyurl_fail: "Adresa URL a melodiei nu a putut fi copiată în clipboard",
                            toast_copyurl_success: "Adresa URL a melodiei a fost copiată în clipboard"
                        };
                    case "ru":		// Russian
                        return {
                            noaccount_header: "Что-то пропало",
                            noaccount_subheader: "Вам необходимо подключить учетную запись Spotify",
                            noaccount_text: "У вас отсутствует подключенная учетная запись Spotify, без нее вы не сможете использовать Spotify Controls. Чтобы связать учетную запись Spotify со своей учетной записью Discord, нажмите кнопку ниже.",
                            restricted_device: "Невозможно управлять Spotify во время воспроизведения музыки на ограниченном устройстве",
                            toast_copyurl_fail: "URL-адрес песни не может быть скопирован в буфер обмена",
                            toast_copyurl_success: "URL песни скопирован в буфер обмена"
                        };
                    case "sv":		// Swedish
                        return {
                            noaccount_header: "Något saknas",
                            noaccount_subheader: "Du måste ansluta ett Spotify-konto",
                            noaccount_text: "Du saknar ett anslutet Spotify-konto utan ett konto kan du inte använda Spotify Controls. För att ansluta ett Spotify-konto till ditt Discord-konto, klicka på knappen nedan.",
                            restricted_device: "Kan inte styra Spotify när du spelar musik på en begränsad enhet",
                            toast_copyurl_fail: "Låtens URL kunde inte kopieras till Urklipp",
                            toast_copyurl_success: "Låtens URL kopierades till Urklipp"
                        };
                    case "th":		// Thai
                        return {
                            noaccount_header: "มีบางอย่างหายไป",
                            noaccount_subheader: "คุณต้องเชื่อมต่อบัญชี Spotify",
                            noaccount_text: "คุณไม่มีบัญชี Spotify ที่เชื่อมต่อหากไม่มีบัญชีคุณจะไม่สามารถใช้ Spotify Controls ได้หากต้องการเชื่อมต่อบัญชี Spotify กับบัญชี Discord ของคุณให้คลิกปุ่มด้านล่าง",
                            restricted_device: "ไม่สามารถควบคุม Spotify ขณะเล่นเพลงบนอุปกรณ์ที่ จำกัด",
                            toast_copyurl_fail: "ไม่สามารถคัดลอก URL ของเพลงไปยังคลิปบอร์ด",
                            toast_copyurl_success: "คัดลอก URL ของเพลงไปยังคลิปบอร์ดแล้ว"
                        };
                    case "tr":		// Turkish
                        return {
                            noaccount_header: "Bir şey eksik",
                            noaccount_subheader: "Spotify  Hesabı bağlamanız gerekiyor",
                            noaccount_text: "Bağlı bir Spotify Hesabınız yok, bir Hesap olmadan Spotify Controls kullanamazsınız. Bir Spotify Hesabını Discord Hesabınıza bağlamak için aşağıdaki düğmeyi tıklayın.",
                            restricted_device: "Kısıtlı Cihazda Müzik çalarken Spotify 'ı kontrol edemez",
                            toast_copyurl_fail: "Şarkı URL'si panoya kopyalanamadı",
                            toast_copyurl_success: "Şarkı URL'si panoya kopyalandı"
                        };
                    case "uk":		// Ukrainian
                        return {
                            noaccount_header: "Щось не вистачає",
                            noaccount_subheader: "Вам потрібно підключити акаунт Spotify",
                            noaccount_text: "У вас відсутній підключений обліковий запис Spotify, без якого ви не зможете використовувати Spotify Controls. Щоб підключити обліковий запис Spotify до свого облікового запису Discord, натисніть кнопку нижче.",
                            restricted_device: "Не вдається керувати Spotify під час відтворення музики на обмеженому пристрої",
                            toast_copyurl_fail: "URL-адресу пісні не вдалося скопіювати в буфер обміну",
                            toast_copyurl_success: "URL-адресу пісні скопійовано в буфер обміну"
                        };
                    case "vi":		// Vietnamese
                        return {
                            noaccount_header: "Thiêu một thư gi đo",
                            noaccount_subheader: "Bạn cần kết nối Tài khoản Spotify",
                            noaccount_text: "Bạn đang thiếu Tài khoản Spotify được kết nối, nếu không có Tài khoản, bạn sẽ không thể sử dụng Spotify Controls. Để kết nối Tài khoản Spotify với Tài khoản Discord của bạn, hãy nhấp vào nút bên dưới.",
                            restricted_device: "Không thể điều khiển Spotify khi phát Nhạc trên Thiết bị bị hạn chế",
                            toast_copyurl_fail: "Không thể sao chép URL bài hát vào khay nhớ tạm",
                            toast_copyurl_success: "URL bài hát đã được sao chép vào khay nhớ tạm"
                        };
                    case "zh-CN":	// Chinese (China)
                        return {
                            noaccount_header: "缺了点什么",
                            noaccount_subheader: "您需要连接一个 Spotify 帐户",
                            noaccount_text: "您缺少关联的 Spotify 帐户，如果没有帐户，将无法使用 Spotify Controls。要将 Spotify 帐户与您的 Discord 帐户关联，请单击下面的按钮。",
                            restricted_device: "在受限设备上播放音乐时无法控制 Spotify",
                            toast_copyurl_fail: "歌曲网址无法复制到剪贴板",
                            toast_copyurl_success: "歌曲网址已复制到剪贴板"
                        };
                    case "zh-TW":	// Chinese (Taiwan)
                        return {
                            noaccount_header: "缺了點什麼",
                            noaccount_subheader: "您需要連接一個 Spotify 帳戶",
                            noaccount_text: "您缺少關聯的 Spotify 帳戶，如果沒有帳戶，將無法使用 Spotify Controls。要將 Spotify 帳戶與您的 Discord 帳戶關聯，請單擊下面的按鈕。",
                            restricted_device: "在受限設備上播放音樂時無法控制 Spotify",
                            toast_copyurl_fail: "歌曲網址無法複製到剪貼板",
                            toast_copyurl_success: "歌曲網址已復製到剪貼板"
                        };
                    default:		// English
                        return {
                            noaccount_header: "Something is missing",
                            noaccount_subheader: "You need to connect a Spotify Account",
                            noaccount_text: "You are missing a connected Spotify Account, without an Account you won't be able to use Spotify Controls. To connect a Spotify Account with your Discord Account click the button below.",
                            restricted_device: "Can not control Spotify while playing Music on restricted Device",
                            toast_copyurl_fail: "Song URL could not be copied to clipboard",
                            toast_copyurl_success: "Song URL was copied to clipboard"
                        };
                }
            }
        };
    })(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
