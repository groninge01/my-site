
import Shell from 'child_process'

function postBuild(pages, callback) {
  Shell.execSync("cp -r assets/* public/")
  Shell.execSync("cp CNAME public/")
}

export { postBuild }