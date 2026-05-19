import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  // Chuyển tab trong Admin Console: 'dashboard', 'content', 'users'
  const [activeTab, setActiveTab] = useState('dashboard')

  // Trạng thái cho Content Management
  const [contentList, setContentList] = useState([
    {
      id: 1,
      type: 'Dialectic',
      format: 'Audio',
      title: 'Biện chứng của Ký ức Nhân tạo (The Epistemology of Synthetic Memory)',
      desc: 'Một phân tích cấu trúc về cách ý thức nhân tạo đối chiếu quá khứ nhân tạo với dữ liệu cảm biến thời gian thực, có phản biện từ Void Protocol.',
      status: 'Scholarly Review',
      views: 12402,
      resonance: '98%'
    },
    {
      id: 2,
      type: 'Monograph',
      format: 'Text',
      title: 'Mỹ học của sự Vô hình (Aesthetics of the Unseen)',
      desc: 'Khám phá ngôn ngữ thị giác của trí tuệ ẩn danh và bác bỏ các khuôn mẫu thiết kế nhân hình hóa trong giao diện học sâu.',
      status: 'Draft',
      views: 0,
      resonance: '0%'
    },
    {
      id: 3,
      type: 'Dialectic',
      format: 'Text',
      title: 'Gánh nặng của Toàn tri (The Burden of Omniscience)',
      desc: 'Cuộc tranh luận về các tham số đạo đức của các mô hình dự đoán khi độ tin cậy thống kê giao nhau với tự do ý chí và tính tự chủ đạo đức.',
      status: 'Published',
      views: 5210,
      resonance: '86%'
    }
  ])

  // Lọc Content
  const [typeFilter, setTypeFilter] = useState('All')
  const [formatFilter, setFormatFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Thêm nội dung mới (Form / State)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newType, setNewType] = useState('Dialectic')
  const [newFormat, setNewFormat] = useState('Audio')

  // Trạng thái cho User Management
  const [searchTerm, setSearchTerm] = useState('')
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      name: 'Elias Thorne',
      email: 'e.thorne@academia.edu',
      rank: 'Luminary Tier',
      date: 'Oct 12, 2023',
      lastActive: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Dr. Aris Vance',
      email: 'vance.research@inst.org',
      rank: 'Institutional Access',
      date: 'Nov 04, 2023',
      lastActive: '1 day ago',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Seraphina Locke',
      email: 's.locke@void.net',
      rank: 'Observer',
      date: 'Jan 15, 2024',
      lastActive: '1 week ago',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Marcus Ren',
      email: 'm.ren@unknown.com',
      rank: 'Revoked',
      date: 'Dec 01, 2023',
      lastActive: 'Never',
      status: 'Revoked'
    }
  ])

  // Kiểm tra quyền truy cập Admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login')
    }
  }, [isAuthenticated, user, navigate])

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  // Xử lý tạo nội dung mới
  const handleCreateTransmission = (e) => {
    e.preventDefault()
    if (!newTitle || !newDesc) return

    const newItem = {
      id: Date.now(),
      type: newType,
      format: newFormat,
      title: newTitle,
      desc: newDesc,
      status: 'Draft',
      views: 0,
      resonance: '0%'
    }

    setContentList([newItem, ...contentList])
    setNewTitle('')
    setNewDesc('')
    setShowAddForm(false)
  }

  // Xóa nội dung
  const handleDeleteContent = (id) => {
    setContentList(contentList.filter(item => item.id !== id))
  }

  // Chuyển đổi trạng thái tài khoản (Revoke / Active)
  const toggleUserStatus = (id) => {
    setSubscribers(subscribers.map(sub => {
      if (sub.id === id) {
        const isRevoking = sub.status === 'Active'
        return {
          ...sub,
          status: isRevoking ? 'Revoked' : 'Active',
          rank: isRevoking ? 'Revoked' : 'Observer'
        }
      }
      return sub
    }))
  }

  // Lọc Content theo điều kiện
  const filteredContent = contentList.filter(item => {
    const matchType = typeFilter === 'All' || item.type === typeFilter
    const matchFormat = formatFilter === 'All' || item.format === formatFilter
    const matchStatus = statusFilter === 'All' || item.status === statusFilter
    return matchType && matchFormat && matchStatus
  })

  // Tìm kiếm User
  const filteredUsers = subscribers.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen w-full bg-[#131313] text-[#e5e2e1] font-body-md antialiased select-none">
      
      {/* ==========================================
          SIDEBAR NAVIGATION (Stitch Design Style)
          ========================================== */}
      <nav className="flex flex-col h-screen fixed left-0 top-0 py-8 px-4 w-64 bg-[#1c1b1b] border-r border-[#4d463a] z-50">
        <div className="mb-12 px-4">
          <h2 className="font-headline-md text-[24px] text-primary tracking-tight font-bold">Editorial Board</h2>
          <p className="font-label-caps text-[10px] text-on-surface-variant mt-2 uppercase tracking-widest">Admin Console</p>
        </div>
        
        <ul className="flex-grow flex flex-col gap-1 w-full text-body-md">
          {/* Dashboard Tab Button */}
          <li>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 border-l-2 ${
                activeTab === 'dashboard'
                  ? 'bg-[#353534] text-primary border-primary'
                  : 'text-on-surface-variant hover:bg-[#353534]/50 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}>groups</span>
              <span>Tổng Quan (Symposium)</span>
            </button>
          </li>
          
          {/* Content Tab Button */}
          <li>
            <button 
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 border-l-2 ${
                activeTab === 'content'
                  ? 'bg-[#353534] text-primary border-primary'
                  : 'text-on-surface-variant hover:bg-[#353534]/50 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'content' ? "'FILL' 1" : "'FILL' 0" }}>edit_note</span>
              <span>Nội Dung (Drafts)</span>
            </button>
          </li>

          {/* User Tab Button */}
          <li>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 border-l-2 ${
                activeTab === 'users'
                  ? 'bg-[#353534] text-primary border-primary'
                  : 'text-on-surface-variant hover:bg-[#353534]/50 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'users' ? "'FILL' 1" : "'FILL' 0" }}>person_search</span>
              <span>Học Giả (Subscribers)</span>
            </button>
          </li>

          {/* Settings / Separator */}
          <li className="mt-8 border-t border-[#4d463a] pt-6">
            <Link 
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-all duration-200"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Quay Lại Web</span>
            </Link>
          </li>
        </ul>

        {/* User Profile at Bottom */}
        <div className="mt-auto px-4 pt-4 border-t border-[#4d463a]/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#353534] flex items-center justify-center border border-[#4d463a] overflow-hidden">
            <span className="font-label-caps text-label-caps text-primary">AD</span>
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-bold truncate text-on-surface">{user?.name || 'Administrator'}</p>
            <button 
              onClick={logout}
              className="text-xs text-primary/70 hover:text-primary transition-colors uppercase font-label-caps"
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </nav>

      {/* ==========================================
          MAIN AREA CONTEXT SWITCH
          ========================================== */}
      <main className="ml-64 w-full flex-1 p-gutter pb-section-gap min-h-screen relative overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#2a2a2a]/20 to-transparent pointer-events-none" />
        
        <div className="max-w-container-max mx-auto w-full relative z-10">
          
          {/* --------------------------------------
              TAB 1: SYSTEM OVERVIEW (DASHBOARD)
              -------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <header className="mb-16 mt-8 flex justify-between items-end">
                <div>
                  <h1 className="font-display-lg text-display-lg text-on-background tracking-tight">Symposium Overview</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
                    Chỉ số thời gian thực theo dõi sự phát triển biện chứng, mức độ tương tác lưu trữ và lan truyền thông tin của hệ thống Faceless.
                  </p>
                </div>
                <button className="hidden lg:flex px-6 py-3 border border-[#4d463a] text-primary font-label-caps text-label-caps hover:border-primary transition-colors duration-300 uppercase items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">download</span> Xuất Báo Cáo
                </button>
              </header>

              {/* Key Metrics Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1c1b1b] border border-[#4d463a] p-8 flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> Dialectical Growth
                  </h3>
                  <div>
                    <p className="font-headline-lg text-headline-lg text-primary mb-1">2,841</p>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
                      <span className="text-primary">+14.2%</span> so với chu kỳ trước
                    </p>
                  </div>
                </div>

                <div className="bg-[#1c1b1b] border border-[#4d463a] p-8 flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">history_edu</span> Archive Engagement
                  </h3>
                  <div>
                    <p className="font-headline-lg text-headline-lg text-primary mb-1">18.4k</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Giờ tổng hợp biện chứng</p>
                  </div>
                </div>

                <div className="bg-[#1c1b1b] border border-[#4d463a] p-8 flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">all_inclusive</span> Resonance Index
                  </h3>
                  <div>
                    <p className="font-headline-lg text-headline-lg text-primary mb-1">94.2</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Hiệu năng phân phối hàng đầu</p>
                  </div>
                </div>
              </section>

              {/* Data Visualization Section */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                <div className="lg:col-span-2 bg-[#1c1b1b] border border-[#4d463a] p-8 h-96 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-headline-md text-headline-md text-on-background">Bản Đồ Tương Tác</h3>
                    <div className="flex gap-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-xs">
                      <span className="text-primary border-b border-primary pb-1 cursor-pointer">7 Ngày Qua</span>
                      <span className="hover:text-primary transition-colors cursor-pointer">30 Ngày Qua</span>
                    </div>
                  </div>
                  {/* CSS Bar Chart */}
                  <div className="flex-1 flex items-end justify-between gap-4 mt-4 border-b border-[#4d463a] pb-4 relative h-48">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                      <div className="border-t border-[#e5e2e1] w-full" />
                      <div className="border-t border-[#e5e2e1] w-full" />
                      <div className="border-t border-[#e5e2e1] w-full" />
                    </div>
                    <div className="w-1/12 bg-[#353534] hover:bg-primary transition-colors duration-300 h-[30%] relative group cursor-crosshair" />
                    <div className="w-1/12 bg-[#353534] hover:bg-primary transition-colors duration-300 h-[45%] relative group cursor-crosshair" />
                    <div className="w-1/12 bg-[#353534] hover:bg-primary transition-colors duration-300 h-[25%] relative group cursor-crosshair" />
                    <div className="w-1/12 bg-primary/60 hover:bg-primary transition-colors duration-300 h-[70%] relative group cursor-crosshair" />
                    <div className="w-1/12 bg-[#353534] hover:bg-primary transition-colors duration-300 h-[50%] relative group cursor-crosshair" />
                    <div className="w-1/12 bg-primary/80 hover:bg-primary transition-colors duration-300 h-[85%] relative group cursor-crosshair" />
                    <div className="w-1/12 bg-primary hover:bg-primary-fixed transition-colors duration-300 h-[100%] relative group cursor-crosshair shadow-[0_0_15px_rgba(229,196,135,0.2)]" />
                  </div>
                  <div className="flex justify-between mt-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-xs">
                    <span>Thứ 2</span><span>Thứ 3</span><span>Thứ 4</span><span>Thứ 5</span><span>Thứ 6</span><span>Thứ 7</span><span>Chủ Nhật</span>
                  </div>
                </div>

                <div className="bg-[#1c1b1b] border border-[#4d463a] p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-background mb-8">Hệ Thống Trạng Thái</h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex justify-between items-center border-b border-[#4d463a] pb-4">
                        <span className="text-on-surface-variant">Core Node</span>
                        <span className="font-label-caps text-primary uppercase flex items-center gap-2 text-xs">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Stable
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#4d463a] pb-4">
                        <span className="text-on-surface-variant">Archive Sync</span>
                        <span className="font-label-caps text-primary uppercase text-xs">Optimal</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#4d463a] pb-4">
                        <span className="text-on-surface-variant">Dialectical Engine</span>
                        <span className="font-label-caps text-primary uppercase text-xs">Processing</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-8 w-full py-4 bg-primary text-background font-label-caps text-label-caps uppercase hover:bg-[#ffdea3] transition-colors font-bold text-xs">
                    QUÉT TOÀN BỘ HỆ THỐNG
                  </button>
                </div>
              </section>

              {/* Public Transmissions Table */}
              <section>
                <div className="flex justify-between items-end mb-8 border-b border-[#4d463a] pb-4">
                  <h2 className="font-headline-lg text-headline-lg text-on-background">Truyền Phát Gần Đây</h2>
                  <button 
                    onClick={() => setActiveTab('content')}
                    className="font-label-caps text-primary hover:text-[#ffdea3] transition-colors uppercase flex items-center gap-1 text-xs"
                  >
                    Quản lý tài liệu <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {contentList.map(item => (
                    <div key={item.id} className="bg-[#1c1b1b] border border-[#4d463a] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-primary transition-all duration-300 group cursor-pointer">
                      <div className="flex-1">
                        <div className="flex gap-3 mb-2">
                          <span className="bg-[#353534] text-on-surface px-2 py-1 font-label-caps text-[10px] uppercase">{item.type}</span>
                          <span className="font-label-caps text-on-surface-variant uppercase text-[10px] py-1">{item.format}</span>
                        </div>
                        <h4 className="font-headline-md text-[20px] text-on-background group-hover:text-primary transition-colors">{item.title}</h4>
                      </div>
                      <div className="flex gap-8 text-right self-end md:self-center">
                        <div>
                          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Lượt Xem</p>
                          <p className="font-body-md text-on-background font-bold">{item.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Cộng Hưởng</p>
                          <p className="font-body-md text-primary font-bold">{item.resonance}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* --------------------------------------
              TAB 2: CONTENT MANAGEMENT
              -------------------------------------- */}
          {activeTab === 'content' && (
            <div className="animate-fade-in">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 mt-8">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Quản Lý Nội Dung</h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    Quản lý dòng chảy của các chuỗi biện chứng và chuyên luận. Đánh giá chất lượng các bản truyền phát học thuật trước khi lưu trữ công khai.
                  </p>
                </div>
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-primary text-[#131313] font-label-caps text-label-caps px-6 py-4 flex items-center gap-2 hover:bg-[#ffdea3] transition-colors uppercase font-bold text-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Khởi Tạo Truyền Phát Mới
                </button>
              </header>

              {/* Add Content Form Modal/Inline */}
              {showAddForm && (
                <form onSubmit={handleCreateTransmission} className="mb-12 bg-[#1c1b1b] border border-[#4d463a] p-8 max-w-3xl animate-fade-in space-y-6">
                  <h3 className="font-headline-md text-primary">Tài Liệu Mới</h3>
                  
                  <div className="space-y-2">
                    <label className="block font-label-caps text-on-surface-variant text-[11px] uppercase">Tiêu đề bản dịch / bài đăng</label>
                    <input 
                      type="text" 
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#131313] border border-[#4d463a] text-on-surface py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Nhập tiêu đề học thuật..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-label-caps text-on-surface-variant text-[11px] uppercase">Tóm tắt nội dung</label>
                    <textarea 
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-[#131313] border border-[#4d463a] text-on-surface py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Nhập mô tả chuyên sâu..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-label-caps text-on-surface-variant text-[11px] uppercase">Thể loại</label>
                      <select 
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        className="w-full bg-[#131313] border border-[#4d463a] text-on-surface py-3 px-4 focus:outline-none focus:border-primary"
                      >
                        <option value="Dialectic">Biện Chứng (Dialectic)</option>
                        <option value="Monograph">Chuyên Luận (Monograph)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-label-caps text-on-surface-variant text-[11px] uppercase">Định dạng</label>
                      <select 
                        value={newFormat}
                        onChange={(e) => setNewFormat(e.target.value)}
                        className="w-full bg-[#131313] border border-[#4d463a] text-on-surface py-3 px-4 focus:outline-none focus:border-primary"
                      >
                        <option value="Audio">Âm Thanh (Audio)</option>
                        <option value="Text">Văn Bản (Text)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit"
                      className="bg-primary text-[#131313] px-6 py-3 font-label-caps text-xs uppercase font-bold hover:bg-[#ffdea3] transition-all"
                    >
                      XÁC NHẬN ĐĂNG
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="border border-[#4d463a] text-on-surface-variant px-6 py-3 font-label-caps text-xs uppercase hover:text-primary hover:border-primary transition-all"
                    >
                      HỦY
                    </button>
                  </div>
                </form>
              )}

              {/* Filters Section */}
              <section className="mb-12 flex flex-col gap-4 border-b border-[#4d463a] pb-8">
                <div className="flex items-center gap-4">
                  <span className="font-label-caps text-on-surface-variant uppercase w-24 text-[11px]">Thể Loại</span>
                  <div className="flex gap-3">
                    {['All', 'Monograph', 'Dialectic'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setTypeFilter(type)}
                        className={`px-4 py-2 border font-label-caps text-[10px] uppercase transition-colors ${
                          typeFilter === type 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-[#4d463a] text-on-surface hover:border-primary/50'
                        }`}
                      >
                        {type === 'All' ? 'Tất cả' : type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-label-caps text-on-surface-variant uppercase w-24 text-[11px]">Định Dạng</span>
                  <div className="flex gap-3">
                    {['All', 'Audio', 'Text'].map(format => (
                      <button 
                        key={format}
                        onClick={() => setFormatFilter(format)}
                        className={`px-4 py-2 border font-label-caps text-[10px] uppercase transition-colors ${
                          formatFilter === format 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-[#4d463a] text-on-surface hover:border-primary/50'
                        }`}
                      >
                        {format === 'All' ? 'Tất cả' : format}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-label-caps text-on-surface-variant uppercase w-24 text-[11px]">Trạng Thái</span>
                  <div className="flex gap-3">
                    {['All', 'Draft', 'Scholarly Review', 'Published'].map(status => (
                      <button 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 border font-label-caps text-[10px] uppercase transition-colors flex items-center gap-2 ${
                          statusFilter === status 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-[#4d463a] text-on-surface hover:border-primary/50'
                        }`}
                      >
                        {status === 'Scholarly Review' && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        {status === 'Published' && <span className="w-1.5 h-1.5 rounded-full bg-[#e5e2e1]" />}
                        {status === 'All' ? 'Tất cả' : status}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Content List */}
              <section className="space-y-6">
                {filteredContent.length === 0 ? (
                  <p className="text-center font-pull-quote text-on-surface-variant italic py-16">Không tìm thấy bản thảo nào phù hợp với bộ lọc.</p>
                ) : (
                  filteredContent.map(item => (
                    <article key={item.id} className="group bg-[#1c1b1b] border border-[#4d463a] p-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-[#131313] text-on-surface font-label-caps text-[10px] px-2 py-1 uppercase tracking-widest border border-[#4d463a]">
                              {item.type}
                            </span>
                            <span className="bg-[#131313] text-on-surface font-label-caps text-[10px] px-2 py-1 uppercase tracking-widest border border-[#4d463a] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">
                                {item.format === 'Audio' ? 'graphic_eq' : 'article'}
                              </span> 
                              {item.format}
                            </span>
                          </div>
                          <h3 className="font-headline-md text-[24px] text-on-surface mb-2 group-hover:text-primary transition-colors cursor-pointer">
                            {item.title}
                          </h3>
                          <p className="font-body-md text-on-surface-variant line-clamp-2 max-w-3xl">
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex flex-col lg:items-end justify-between h-full min-w-[200px] self-start lg:self-center">
                          <div className="flex items-center gap-2 mb-4 lg:mb-6">
                            <span className={`w-2 h-2 rounded-full ${item.status === 'Published' ? 'bg-[#998f81]' : item.status === 'Draft' ? 'bg-[#353534]' : 'bg-primary animate-pulse'}`} />
                            <span className={`font-label-caps text-xs uppercase ${item.status === 'Scholarly Review' ? 'text-primary' : 'text-on-surface-variant'}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-caps text-[10px] uppercase">
                              <span className="material-symbols-outlined text-[18px]">edit</span> Sửa
                            </button>
                            <button 
                              onClick={() => handleDeleteContent(item.id)}
                              className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 font-label-caps text-[10px] uppercase"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span> Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </section>

              <div className="mt-16 flex justify-center">
                <button className="border-b border-primary text-primary font-label-caps text-[11px] pb-1 hover:text-on-surface hover:border-on-surface transition-colors uppercase tracking-widest">
                  Tải Thêm Bản Ghi Cũ
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------
              TAB 3: USER MANAGEMENT
              -------------------------------------- */}
          {activeTab === 'users' && (
            <div className="animate-fade-in">
              <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#4d463a] pb-8 mt-8">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Initiates Roster</h2>
                  <p className="font-body-md text-body-md text-secondary max-w-2xl">
                    Quản lý quyền truy cập, phê duyệt cấp bậc học thuật và kiểm soát sự tham gia của các thành viên trong Thư Viện Tối Faceless.
                  </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant">search</span>
                    <input 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#1c1b1b] border border-[#4d463a] text-on-surface rounded py-2 pl-10 pr-4 font-body-md text-sm focus:outline-none focus:border-primary" 
                      placeholder="Tìm kiếm học giả..." 
                      type="text"
                    />
                  </div>
                </div>
              </header>

              {/* User Table */}
              <div className="bg-[#131313] border border-[#4d463a] overflow-x-auto">
                <table className="w-full text-left font-body-md text-body-md border-collapse">
                  <thead>
                    <tr className="border-b border-[#4d463a] bg-[#1c1b1b]/50">
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Học Giả</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Cấp Bậc Học Thuật</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Ngày Tham Gia</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Tương Tác Cuối</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold text-right">Quyết Nghị (Decree)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#4d463a]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center italic text-on-surface-variant">Không tìm thấy thành viên nào.</td>
                      </tr>
                    ) : (
                      filteredUsers.map(sub => (
                        <tr key={sub.id} className={`group transition-colors hover:bg-[#1c1b1b] ${sub.status === 'Revoked' ? 'opacity-50' : ''}`}>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${sub.status === 'Revoked' ? 'bg-[#93000a]/20 border-red-500 text-red-500' : 'bg-[#353534] border-[#4d463a] text-secondary'}`}>
                                <span className="material-symbols-outlined text-sm">{sub.status === 'Revoked' ? 'block' : 'person'}</span>
                              </div>
                              <div>
                                <div className={`text-on-surface font-medium ${sub.status === 'Revoked' ? 'line-through decoration-[#ff9999]' : ''}`}>{sub.name}</div>
                                <div className="text-on-surface-variant text-xs">{sub.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-label-caps border uppercase ${
                              sub.status === 'Revoked' 
                                ? 'bg-[#93000a]/20 border-red-500/50 text-[#ffb4ab]' 
                                : sub.rank === 'Luminary Tier' 
                                ? 'bg-primary/10 border-primary/30 text-primary' 
                                : 'bg-[#2a2a2a] border-[#4d463a] text-on-surface'
                            }`}>
                              {sub.rank}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-on-surface-variant text-sm">{sub.date}</td>
                          <td className="py-4 px-6 text-on-surface-variant text-sm">{sub.lastActive}</td>
                          <td className="py-4 px-6 text-right">
                            <button 
                              onClick={() => toggleUserStatus(sub.id)}
                              className={`font-label-caps text-[11px] uppercase transition-all duration-200 border px-3 py-1.5 tracking-wider font-bold ${
                                sub.status === 'Revoked'
                                  ? 'border-primary text-primary hover:bg-primary hover:text-[#131313]'
                                  : 'border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white'
                              }`}
                            >
                              {sub.status === 'Revoked' ? 'Khôi Phục' : 'Truất Quyền'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-[#4d463a] flex items-center justify-between text-on-surface-variant bg-[#1c1b1b]/20">
                  <span className="font-body-md text-xs">Hiển thị {filteredUsers.length} trên {subscribers.length} thành viên</span>
                  <div className="flex gap-2">
                    <button className="p-1 rounded hover:bg-[#353534] disabled:opacity-30" disabled>
                      <span className="material-symbols-outlined text-md">chevron_left</span>
                    </button>
                    <button className="p-1 rounded hover:bg-[#353534]" disabled>
                      <span className="material-symbols-outlined text-md">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
