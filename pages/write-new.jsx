import { jose } from "@/components/Fonts"
import { popUp } from "@/components/Modal";
import { success } from "@/components/Publish";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import Head from "next/head"
import Image from "next/image";
import { useEffect, useState } from "react"

export async function getServerSideProps({ req }) {

  return {
    props: {
      cookies: req.cookies,
    }
  }
}

export default function Writenew({ cookies }) {
  let clientCookie = cookies?.data
  let serverCookie = cookies?.parallelVortex
  if (clientCookie) clientCookie = JSON.parse(cookies?.data)

  const [title, setTitle] = useState(null)
  const [cover, setCover] = useState(null)
  const [des, setDes] = useState(null)

  useEffect(() => {
    const boldButton = document.getElementById("boldButton");
    const italicButton = document.getElementById("italicButton");
    const underlineButton = document.getElementById("underlineButton");
    const url = document.getElementById("url");
    const html = document.getElementById("html");
    const format = document.getElementById("format");

    function performAction(command, back) {
      document.execCommand(command, false, back || null);
      // editor.focus();
    }

    boldButton.addEventListener("click", function () {
      performAction("bold");
    });

    italicButton.addEventListener("click", function () {
      performAction("italic");
    });

    underlineButton.addEventListener("click", function () {
      performAction("underline");
    });

    url.addEventListener("click", function () {
      let foo = prompt('Insert link here');
      if (!foo) return null
      performAction("createLink", foo);
    });

    html.addEventListener("click", () => {
      performAction('formatBlock', '<h2>');
      let listId = window.getSelection().focusNode.parentNode;
      if (!listId?.id) listId.classList.add("__className_400e46", "text-3xl", "mt-2")
    })

    format.addEventListener("click", () => {
      performAction('formatBlock', '<h3>');
      let listId = window.getSelection().focusNode.parentNode;
      if (!listId?.id) listId.classList.add("__className_400e46", "text-2xl", "mt-2")
    })

    let ce = document.querySelector('[contenteditable]')
    ce.addEventListener('paste', function (e) {
      e.preventDefault()
      var text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    })

  }, [])

  function performAction(command, back) {
    document.execCommand(command, false, back || null);
    // editor.focus();
  }

  function draftIt() {
    let body = []
    Array.from(document.getElementById("edit").children).map(e => {
      body.push(e.outerHTML);
    })

    console.log(title, cover, des, body);

    if (!title) return null

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/article/draft`,
      headers: {
        'Authorization': `Bearer ${serverCookie}`,
      },
      data: {
        title, cover, description: des, body
      }
    }).then(res => {
      console.log(res);
      popUp(res.data.message)
      window.location.replace(`/draft/${res.data.id}`)
    }).catch(err => {
      popUp(err.message + " " + err.response.data.message)
    })
  }

  function publishIt() {
    let body = []
    Array.from(document.getElementById("edit").children).map(e => {
      body.push(e.outerHTML);
    })

    if (!title) return popUp("Title Missing"), document.getElementById("publishBtn").disabled = false
    if (!cover) return popUp("Cover Missing"), document.getElementById("publishBtn").disabled = false
    if (!des) return popUp("Description Missing"), document.getElementById("publishBtn").disabled = false
    if (body.length < 2) return popUp("Body Too Short"), document.getElementById("publishBtn").disabled = false

    let tags = [document.getElementById("tags").value.split(",")[0], document.getElementById("tags").value.split(",")[1], document.getElementById("tags").value.split(",")[2]]

    let permalink = title.split(" ").join("-").toLocaleLowerCase()

    // console.log(title, cover, des, body, encodeURIComponent(permalink), tags);

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/article`,
      headers: {
        'Authorization': `Bearer ${serverCookie}`,
      },
      data: {
        title, cover, description: des, body, permalink: encodeURIComponent(permalink), tags
      }
    }).then(res => {
      success(res.data.title, res.data.link, res.data.cover, res.data.description)
    }).catch(err => {
      popUp(err.message + " " + err.response.data.message)
      document.getElementById("publishBtn").disabled = false
    })
  }

  return (
    <>
      <Head>
        <title>Write an Article</title>
      </Head>
      <main className="flex justify-center min-h-[90svh] px-4 lg:px-16">
        <div className="flex  max-lg:w-full w-full max-w-3xl flex-col items-center gap-4 py-5">
          <textarea id="title" onChange={(e) => {
            setTitle(e.target.value);
          }} onKeyDown={(e) => {
            if (e.keyCode == 13) e.preventDefault(), document.getElementById("edit").focus()
          }} contentEditable placeholder="Title" className={`${jose.className} px-3 py-1 outline-none text-3xl w-full border-l-4 resize-none overflow-hidden`} rows={2} maxLength={80}></textarea>

          <div className="min-h-[200px] w-full lg:p-1 flex max-lg:flex-col gap-3">
            <div onClick={() => {
              let image = prompt("Search Image for")
              if (!image) return null
              document.getElementById("coverImages").innerHTML = "Searching"
              fetch("/api/unsplash", {
                method: "POST",
                body: JSON.stringify({
                  query: image.toLocaleLowerCase(),
                })
              }).then((res) => res.json()).then(res => {
                document.getElementById("coverImages").innerHTML = null
                res.response.results.map(e => {
                  const node = document.createElement("img")
                  node.classList.add("h-28", "w-[48%]", "bg-slate-300", "object-cover", "cursor-pointer")
                  node.src = e.urls.regular
                  node.onclick = (e) => {
                    setCover(e.target.src)
                    document.getElementById("coverImages").innerHTML = null
                  }
                  document.getElementById("coverImages").appendChild(node)
                })
              })
            }} className="relative overflow-hidden lg:w-1/2 w-full lg:h-full h-60 rounded-md bg-slate-100 cursor-pointer">
              {cover ? <Image id="cover" className="object-cover" loader={() => cover} src={cover} fill /> : <></>}
              <span className="absolute top-1/2 left-1/2 -translate-x-10 -translate-y-5 text-sm font-semibold uppercase opacity-40">Add Image</span>
            </div>
            <textarea onChange={(e) => {
              setDes(e.target.value)
            }} placeholder="Write description" className="flex-1 outline-none border-l-4 shadow resize-none p-1" id="des"></textarea>
          </div>

          <span id="coverImages" className="w-full gap-2 flex flex-wrap"></span>

          <div onPaste={(e) => {
            e.preventDefault()
            let text = e.clipboardData.getData('text/plain').replace(/[\r]/g, "")
            document.execCommand('insertText', false, text)
          }} onKeyDown={(e) => {
            if (e.keyCode == 13) {
            }
          }} id="edit" role="textbox" contentEditable className="flex flex-col w-full gap-3 px-2 outline-none border-l-4 min-h-[24px] cursor-text">
            <p>Write Something Here...</p>
          </div>
        </div>

        {/* Floating BTNs */}
        <div className="fixed text-white font-semibold flex lg:flex-col gap-1 bg-zinc-300 rounded-md p-1 lg:w-10 left-0 lg:top-[15%] max-lg:bottom-0 max-lg:w-full">
          <button onClick={() => {
            draftIt()
          }} className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </button>
          <button id="html" onPointerDown={(e) => {
            e.preventDefault()
          }} className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">H2</button>
          <button id="format" className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">H3</button>
          <button onClick={() => {
            document.getElementById("imgModal").classList.replace("opacity-0", "opacity-100")
            document.getElementById("imgModal").classList.remove("pointer-events-none")
          }} className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          <button onPointerDown={(e) => {
            e.preventDefault()
          }} id="boldButton" className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">B</button>
          <button onPointerDown={(e) => {
            e.preventDefault()
          }} id="italicButton" className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">I</button>
          <button onPointerDown={(e) => {
            e.preventDefault()
          }} id="underlineButton" className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">U</button>
          <button onPointerDown={(e) => {
            e.preventDefault()
          }} id="url" className="rounded shadow flex items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </button>
          <button id="hiddenBtn" onPointerDown={(e) => {
            e.preventDefault()
          }} onClick={() => {
            publishIt()
          }} className="rounded shadow hidden items-center justify-center lg:hover:bg-slate-950 cursor-pointer bg-zinc-900 h-12 w-full">P</button>
        </div>

        {/* Unsplash Image Modal */}
        <div id="imgModal" className="fixed flex flex-col gap-3 items-center p-2 bg-white bg-opacity-95 opacity-0 pointer-events-none transition-opacity duration-200 min-h-[95svh] h-full w-screen">
          <button onClick={() => {
            document.getElementById("imgModal").classList.replace("opacity-100", "opacity-0")
            document.getElementById("imgModal").classList.add("pointer-events-none")
          }} className="absolute right-10 top-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg></button>
          <div className="flex flex-col gap-2 rounded-md p-1 mt-10">
            <form onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("images").innerHTML = "Searching..."
              e.target.children[1].disabled = true

              fetch("/api/unsplash", {
                method: "POST",
                body: JSON.stringify({
                  query: `${e.target.children[0].value}`.toLocaleLowerCase(),
                  // color: "red"
                })
              }).then((res) => res.json()).then(res => {
                document.getElementById("images").innerHTML = null
                res.response.results.map(e => {
                  const node = document.createElement("img")
                  node.classList.add("h-28", "w-96", "max-lg:w-[90svw]", "bg-slate-300", "object-cover", "cursor-pointer")
                  node.src = e.urls.regular
                  node.onclick = (e) => {
                    // const articleImg = document.createElement("img")
                    // articleImg.src = e.target.src
                    // articleImg.classList.add("xl:h-[400px]", "h-60", "w-full", "my-4", "object-cover")
                    // document.getElementById("edit").appendChild(articleImg)
                    performAction('insertHTML', `<img class="xl:h-[400px] h-60 w-full my-4 object-cover" src="${e.target.src}" /><br/>`);
                    document.getElementById("imgModal").classList.replace("opacity-100", "opacity-0")
                    document.getElementById("imgModal").classList.add("pointer-events-none")
                  }
                  document.getElementById("images").appendChild(node)
                })
                // console.log(res.response.results)
                e.target.children[1].disabled = false
              }).catch(err => {
                // console.log(err);
                e.target.children[1].disabled = false
                popUp("Error")
              })

            }} className="flex gap-1 bg-zinc-400/40 p-1 rounded-md">
              <input id="unsplash" onKeyDown={(event) => {
                // let key = event.keyCode;
                // if (key === 32) {
                //     event.preventDefault();
                // }
              }} className="bg-slate-50 rounded-md h-10 max-lg:w-[70svw] w-[450px] outline-none px-2" type="text" maxLength={20} autoComplete="off" />
              <button className={`${jose.className} bg-zinc-800/90 disabled:opacity-50 px-3 text-white rounded-md`} >Search</button>
            </form>
            <p className="self-center text-sm font-semibold opacity-50">Select the line where image is to be inserted</p>
          </div>
          <div id="images" className="flex gap-3 justify-center flex-wrap p-10 min-h-[70vh] overflow-auto"></div>
        </div>

        {!serverCookie ? <Unaccess /> : <></>}

      </main>
    </>
  );
}