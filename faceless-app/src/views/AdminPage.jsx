'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { pb } from '../lib/pocketbase'

export default function AdminPage() {
  const { isAuthenticated, isAuthReady, user, logout } = useAuth()
  const router = useRouter()

  // Chuyển tab trong Admin Console: 'dashboard', 'content', 'users'
  const [activeTab, setActiveTab] = useState('dashboard')

  // Trạng thái cho Content Management
  const [contentList, setContentList] = useState([])

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
  const [roleFilter, setRoleFilter] = useState('All')
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState('')
  const [actionUserId, setActionUserId] = useState('')

  // Kiểm tra quyền truy cập Admin
  useEffect(() => {
    if (isAuthReady && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/login')
    }
  }, [isAuthReady, isAuthenticated, user, router])

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Chưa có dữ liệu'
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(dateValue))
  }

  const fetchUsers = async () => {
    setUsersLoading(true)
    setUsersError('')

    try {
      const records = await pb.collection('users').getFullList({
        sort: '-created',
        requestKey: null,
      })
      setUsers(records)
    } catch (err) {
      console.error(err)
      setUsersError(err.message || 'Không thể tải danh sách user từ database.')
    } finally {
      setUsersLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthReady && isAuthenticated && user?.role === 'admin') {
      fetchUsers()
    }
  }, [isAuthReady, isAuthenticated, user?.role])

  if (!isAuthReady || !isAuthenticated || user?.role !== 'admin') {
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

  const updateUserRole = async (targetUserId, nextRole) => {
    if (targetUserId === user?.id && nextRole !== 'admin') {
      setUsersError('Không thể hạ quyền chính tài khoản admin đang đăng nhập.')
      return
    }

    setActionUserId(targetUserId)
    setUsersError('')

    try {
      const updated = await pb.collection('users').update(targetUserId, { role: nextRole })
      setUsers((currentUsers) => currentUsers.map((item) => (item.id === targetUserId ? updated : item)))
    } catch (err) {
      console.error(err)
      setUsersError(err.message || 'Không thể cập nhật quyền user.')
    } finally {
      setActionUserId('')
    }
  }

  const deleteUser = async (targetUserId) => {
    if (targetUserId === user?.id) {
      setUsersError('Không thể xóa chính tài khoản admin đang đăng nhập.')
      return
    }

    const confirmed = window.confirm('Bạn chắc chắn muốn xóa user này khỏi database? Hành động này không thể hoàn tác.')
    if (!confirmed) return

    setActionUserId(targetUserId)
    setUsersError('')

    try {
      await pb.collection('users').delete(targetUserId)
      setUsers((currentUsers) => currentUsers.filter((item) => item.id !== targetUserId))
    } catch (err) {
      console.error(err)
      setUsersError(err.message || 'Không thể xóa user.')
    } finally {
      setActionUserId('')
    }
  }

  // Lọc Content theo điều kiện
  const filteredContent = contentList.filter(item => {
    const matchType = typeFilter === 'All' || item.type === typeFilter
    const matchFormat = formatFilter === 'All' || item.format === formatFilter
    const matchStatus = statusFilter === 'All' || item.status === statusFilter
    return matchType && matchFormat && matchStatus
  })

  // Tìm kiếm User thật từ PocketBase
  const filteredUsers = users.filter((item) => {
    const query = searchTerm.trim().toLowerCase()
    const itemRole = item.role || 'user'
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.username?.toLowerCase().includes(query)
    const matchesRole = roleFilter === 'All' || itemRole === roleFilter

    return matchesSearch && matchesRole
  })

  const totalAdmins = users.filter((item) => item.role === 'admin').length
  const totalMembers = users.length - totalAdmins

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
              href="/"
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
              <header className="mb-8 flex flex-col gap-6 border-b border-[#4d463a] pb-8 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Quản Lý User</h2>
                    <p className="font-body-md text-body-md text-secondary max-w-2xl">
                      Danh sách này được tải trực tiếp từ collection <span className="text-primary">users</span> trong PocketBase. Không còn dữ liệu mẫu hard-code ở tab này.
                    </p>
                  </div>
                  <button
                    onClick={fetchUsers}
                    disabled={usersLoading}
                    className="border border-[#4d463a] text-primary font-label-caps text-[11px] px-4 py-3 uppercase tracking-widest hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span className={'material-symbols-outlined text-[16px] ' + (usersLoading ? 'animate-spin' : '')}>refresh</span>
                    Làm mới
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1c1b1b] border border-[#4d463a] p-5">
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Tổng user</p>
                    <p className="font-headline-md text-[30px] text-primary">{users.length}</p>
                  </div>
                  <div className="bg-[#1c1b1b] border border-[#4d463a] p-5">
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Admin</p>
                    <p className="font-headline-md text-[30px] text-primary">{totalAdmins}</p>
                  </div>
                  <div className="bg-[#1c1b1b] border border-[#4d463a] p-5">
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Member</p>
                    <p className="font-headline-md text-[30px] text-primary">{totalMembers}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="relative w-full md:w-80">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant">search</span>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#1c1b1b] border border-[#4d463a] text-on-surface rounded py-2 pl-10 pr-4 font-body-md text-sm focus:outline-none focus:border-primary"
                      placeholder="Tìm theo tên hoặc email..."
                      type="text"
                    />
                  </div>

                  <div className="flex gap-2">
                    {['All', 'admin', 'user'].map((role) => (
                      <button
                        key={role}
                        onClick={() => setRoleFilter(role)}
                        className={
                          'px-4 py-2 border font-label-caps text-[10px] uppercase transition-colors ' +
                          (roleFilter === role
                            ? 'border-primary text-primary bg-primary/5'
                            : 'border-[#4d463a] text-on-surface hover:border-primary/50')
                        }
                      >
                        {role === 'All' ? 'Tất cả' : role}
                      </button>
                    ))}
                  </div>
                </div>

                {usersError && (
                  <div className="border-l-2 border-error bg-[#1a1010] p-4 text-error font-body-md text-sm">
                    {usersError}
                  </div>
                )}
              </header>

              <div className="bg-[#131313] border border-[#4d463a] overflow-x-auto">
                <table className="w-full text-left font-body-md text-body-md border-collapse">
                  <thead>
                    <tr className="border-b border-[#4d463a] bg-[#1c1b1b]/50">
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">User</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Role</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Xác minh</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Ngày tạo</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold">Cập nhật</th>
                      <th className="py-4 px-6 font-label-caps text-xs text-[#c8c6c2] uppercase tracking-[0.15em] font-bold text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#4d463a]">
                    {usersLoading ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-on-surface-variant">
                          Đang tải user từ database...
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center italic text-on-surface-variant">
                          Không tìm thấy user nào.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((item) => {
                        const itemRole = item.role || 'user'
                        const isCurrentUser = item.id === user?.id
                        const isBusy = actionUserId === item.id

                        return (
                          <tr key={item.id} className="group transition-colors hover:bg-[#1c1b1b]">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-4">
                                <div
                                  className={
                                    'w-9 h-9 rounded-full flex items-center justify-center border ' +
                                    (itemRole === 'admin'
                                      ? 'bg-primary/10 border-primary text-primary'
                                      : 'bg-[#353534] border-[#4d463a] text-secondary')
                                  }
                                >
                                  <span className="material-symbols-outlined text-sm">{itemRole === 'admin' ? 'admin_panel_settings' : 'person'}</span>
                                </div>
                                <div>
                                  <div className="text-on-surface font-medium flex items-center gap-2">
                                    {item.name || 'Chưa đặt tên'}
                                    {isCurrentUser && (
                                      <span className="text-[10px] font-label-caps text-primary uppercase tracking-widest">Bạn</span>
                                    )}
                                  </div>
                                  <div className="text-on-surface-variant text-xs">{item.email || item.username || 'Email ẩn'}</div>
                                  <div className="text-on-surface-variant/60 text-[10px] mt-1">ID: {item.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={itemRole}
                                disabled={isBusy || isCurrentUser}
                                onChange={(e) => updateUserRole(item.id, e.target.value)}
                                className="bg-[#1c1b1b] border border-[#4d463a] text-on-surface px-3 py-2 text-xs font-label-caps uppercase focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                              </select>
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={
                                  'inline-flex items-center px-2.5 py-1 text-[10px] font-label-caps border uppercase ' +
                                  (item.verified
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : 'bg-[#2a2a2a] border-[#4d463a] text-on-surface-variant')
                                }
                              >
                                {item.verified ? 'Đã xác minh' : 'Chưa xác minh'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-on-surface-variant text-sm">{formatDate(item.created)}</td>
                            <td className="py-4 px-6 text-on-surface-variant text-sm">{formatDate(item.updated)}</td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => deleteUser(item.id)}
                                disabled={isBusy || isCurrentUser}
                                className="font-label-caps text-[11px] uppercase transition-all duration-200 border px-3 py-1.5 tracking-wider font-bold border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-400"
                              >
                                {isBusy ? 'Đang xử lý' : 'Xóa'}
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>

                <div className="px-6 py-4 border-t border-[#4d463a] flex items-center justify-between text-on-surface-variant bg-[#1c1b1b]/20">
                  <span className="font-body-md text-xs">Hiển thị {filteredUsers.length} trên {users.length} user</span>
                  <span className="font-body-md text-xs">Nguồn dữ liệu: PocketBase / users</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
