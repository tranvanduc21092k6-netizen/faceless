/**
 * MarkdownParser — Tiện ích phân tích file Markdown kiểu Obsidian
 *
 * Xử lý file .md có YAML frontmatter (giữa cặp ---) và nội dung Markdown.
 *
 * Cách dùng:
 *   const parser = new MarkdownParser(rawMarkdownText)
 *   const meta = parser.getFrontmatter()    // { title, tags, date, topic, ... }
 *   const body = parser.getBodyContent()     // Markdown body (không có frontmatter)
 *   const excerpt = parser.getPublicExcerpt(50) // 50% đầu tiên của body
 */
export class MarkdownParser {
  /**
   * @param {string} rawText — Nội dung thô của file .md
   */
  constructor(rawText = '') {
    this._raw = rawText
    this._frontmatter = null
    this._body = null
    this._parsed = false
  }

  /**
   * _parse — Phân tách frontmatter và body
   * Frontmatter nằm giữa cặp '---' ở đầu file
   */
  _parse() {
    if (this._parsed) return

    const text = this._raw.trim()
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/

    const match = text.match(frontmatterRegex)

    if (match) {
      this._frontmatter = this._parseFrontmatterYAML(match[1])
      this._body = match[2].trim()
    } else {
      this._frontmatter = {}
      this._body = text
    }

    this._parsed = true
  }

  /**
   * _parseFrontmatterYAML — Phân tích YAML đơn giản (không dùng thư viện ngoài)
   *
   * Hỗ trợ:
   *   - key: value (string)
   *   - key: [item1, item2] (inline array)
   *   - key:\n  - item1\n  - item2 (block array)
   *
   * @param {string} yamlString — Chuỗi YAML giữa cặp ---
   * @returns {object} — Object metadata
   */
  _parseFrontmatterYAML(yamlString) {
    const result = {}
    const lines = yamlString.split('\n')
    let currentKey = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Dòng block array item: "  - value"
      if (/^\s+-\s+/.test(line) && currentKey) {
        const value = line.replace(/^\s+-\s+/, '').trim()
        if (!Array.isArray(result[currentKey])) {
          result[currentKey] = []
        }
        result[currentKey].push(this._cleanValue(value))
        continue
      }

      // Dòng key: value
      const kvMatch = line.match(/^(\w[\w\s_-]*?):\s*(.*)$/)
      if (kvMatch) {
        const key = kvMatch[1].trim().toLowerCase().replace(/\s+/g, '_')
        let value = kvMatch[2].trim()

        // Inline array: [item1, item2]
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(v => this._cleanValue(v.trim()))
          result[key] = value
          currentKey = null
        } else if (value === '') {
          // Có thể là block array bên dưới
          currentKey = key
          result[key] = []
        } else {
          result[key] = this._cleanValue(value)
          currentKey = null
        }
      }
    }

    return result
  }

  /**
   * _cleanValue — Xoá dấu ngoặc kép bao quanh value
   */
  _cleanValue(value) {
    if (typeof value !== 'string') return value
    // Bỏ dấu " hoặc ' bao quanh
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1)
    }
    return value
  }

  /**
   * getFrontmatter — Trả về object metadata từ YAML frontmatter
   *
   * @returns {object} — Ví dụ: { title: "...", tags: [...], date: "...", topic: "..." }
   */
  getFrontmatter() {
    this._parse()
    return { ...this._frontmatter }
  }

  /**
   * getBodyContent — Trả về nội dung Markdown body (không có frontmatter)
   *
   * @returns {string} — Markdown text thuần
   */
  getBodyContent() {
    this._parse()
    return this._body
  }

  /**
   * getPublicExcerpt — Cắt phần trăm đầu tiên của body để làm trích đoạn công khai
   *
   * Cắt theo ký tự, đảm bảo không cắt giữa từ.
   * Kết thúc bằng "..." để thể hiện có nội dung tiếp theo.
   *
   * @param {number} percent — Phần trăm nội dung muốn lấy (0-100), mặc định 50
   * @returns {string} — Trích đoạn Markdown
   */
  getPublicExcerpt(percent = 50) {
    this._parse()

    if (!this._body) return ''

    const targetLength = Math.floor(this._body.length * (percent / 100))

    if (targetLength >= this._body.length) {
      return this._body
    }

    // Tìm vị trí cuối câu gần nhất với targetLength
    // Ưu tiên cắt tại dấu xuống dòng kép (đoạn mới)
    let cutIndex = targetLength

    // Tìm ngược lại dấu xuống dòng kép gần nhất
    const lastParagraphBreak = this._body.lastIndexOf('\n\n', targetLength)
    if (lastParagraphBreak > targetLength * 0.7) {
      cutIndex = lastParagraphBreak
    } else {
      // Tìm dấu chấm câu gần nhất
      const lastSentenceEnd = this._body.lastIndexOf('. ', targetLength)
      if (lastSentenceEnd > targetLength * 0.7) {
        cutIndex = lastSentenceEnd + 1
      } else {
        // Tìm khoảng trắng gần nhất (không cắt giữa từ)
        const lastSpace = this._body.lastIndexOf(' ', targetLength)
        if (lastSpace > targetLength * 0.5) {
          cutIndex = lastSpace
        }
      }
    }

    return this._body.slice(0, cutIndex).trim() + '\n\n...'
  }
}

export default MarkdownParser
