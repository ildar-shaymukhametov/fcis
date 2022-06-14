// File writer adaptor, synchronous
const fs = require('fs')

module.exports = {
  write_file: function(filename, data) {
    try {
      fs.writeFileSync(filename, JSON.stringify(data))
      return({ status: 'success',
               file_written: filename })
    } catch (error) {
      return({ status: 'failed',
               error: error })
    }
  }
}

