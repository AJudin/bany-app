import { useEffect, useState, useMemo } from "react";
import { trpc } from "@/providers/trpc";

type RequestStatus = "new" | "processing" | "rejected" | "done";

interface EmailLogEntry {
  toEmail: string;
  sentAt: string;
}

interface RequestItem {
  id: number;
  name: string;
  phone: string;
  email: string;
  comment: string | null;
  status: RequestStatus;
  adminComment: string | null;
  emailLog: string | null;
  createdAt: Date;
}

const statusLabels: Record<RequestStatus, string> = {
  new: "Не обработано",
  processing: "В обработке",
  rejected: "Отказ",
  done: "Обработано",
};

const statusBadgeClass: Record<RequestStatus, string> = {
  new: "bg-danger",
  processing: "bg-warning text-dark",
  rejected: "bg-secondary",
  done: "bg-success",
};

const allStatuses: RequestStatus[] = ["new", "processing", "rejected", "done"];

function parseEmailLog(raw: string | null): EmailLogEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function AdminPage() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin-token"));
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [selected, setSelected] = useState<RequestItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editStatus, setEditStatus] = useState<RequestStatus>("new");
  const [editComment, setEditComment] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

  // Фильтры
  const [activeStatuses, setActiveStatuses] = useState<Set<RequestStatus>>(new Set(allStatuses));
  const [hideRejected, setHideRejected] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("admin-token", data.token);
      setToken(data.token);
      setLoginError("");
    },
    onError: (err) => {
      setLoginError(err.message || "Неверный логин или пароль");
    },
  });

  const requestsQuery = trpc.admin.getRequests.useQuery(undefined, {
    enabled: !!token,
    refetchInterval: 30000,
  });

  const updateMutation = trpc.admin.updateRequest.useMutation({
    onSuccess: () => {
      requestsQuery.refetch();
      setShowModal(false);
      setSelected(null);
    },
  });

  const sendEmailMutation = trpc.admin.sendRequestEmail.useMutation({
    onSuccess: () => {
      setEmailSuccess("Письмо успешно отправлено!");
      requestsQuery.refetch();
      setTimeout(() => setEmailSuccess(""), 3000);
    },
    onError: (err) => {
      alert("Ошибка отправки: " + err.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ login, password });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    setToken(null);
  };

  const toggleStatus = (status: RequestStatus) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const openModal = (item: RequestItem) => {
    setSelected(item);
    setEditStatus(item.status);
    setEditComment(item.adminComment ?? "");
    setEmailTo("");
    setEmailSuccess("");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    updateMutation.mutate({
      id: selected.id,
      status: editStatus,
      adminComment: editComment,
    });
  };

  const handleSendEmail = () => {
    if (!selected || !emailTo.trim()) return;
    sendEmailMutation.mutate({ id: selected.id, toEmail: emailTo.trim() });
  };

  const requests = (requestsQuery.data ?? []) as RequestItem[];

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (hideRejected && req.status === "rejected") return false;
      return activeStatuses.has(req.status);
    });
  }, [requests, activeStatuses, hideRejected]);

  if (!token) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Вход в админку</h3>
                {loginError && <div className="alert alert-danger">{loginError}</div>}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Логин</label>
                    <input
                      type="text"
                      className="form-control"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Вход..." : "Войти"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Админ-панель</h2>
        <div>
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => requestsQuery.refetch()}>
            Обновить
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      {/* Панель фильтрации */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-lg-8">
              <label className="form-label fw-semibold">Фильтр по статусам:</label>
              <div className="d-flex flex-wrap gap-2">
                {allStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`btn btn-sm ${activeStatuses.has(status) ? "btn-dark" : "btn-outline-secondary"}`}
                    onClick={() => toggleStatus(status)}
                  >
                    {statusLabels[status]}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-lg-4 d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="hideRejected"
                  checked={hideRejected}
                  onChange={(e) => setHideRejected(e.target.checked)}
                />
                <label className="form-check-label fw-semibold" htmlFor="hideRejected">
                  Без отказов
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Заявки</h5>
          {requestsQuery.isLoading && <p>Загрузка...</p>}
          {requestsQuery.isError && <div className="alert alert-danger">Ошибка загрузки</div>}
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} onClick={() => openModal(req)} style={{ cursor: "pointer" }}>
                    <td>{req.id}</td>
                    <td>{new Date(req.createdAt).toLocaleString("ru-RU")}</td>
                    <td>{req.name}</td>
                    <td>{req.phone}</td>
                    <td>{req.email}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass[req.status]}`}>
                        {statusLabels[req.status]}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      Заявок не найдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selected && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Заявка #{selected.id}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label"><b>ID</b></label>
                    <p>{selected.id}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><b>Дата получения</b></label>
                    <p>{new Date(selected.createdAt).toLocaleString("ru-RU")}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><b>Имя</b></label>
                    <p>{selected.name}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><b>Телефон</b></label>
                    <p>{selected.phone}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label"><b>Email</b></label>
                    <p>{selected.email}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label"><b>Описание</b></label>
                    <p className="text-break">{selected.comment ?? "—"}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><b>Статус</b></label>
                    <select
                      className="form-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as RequestStatus)}
                    >
                      <option value="new">Не обработано</option>
                      <option value="processing">В обработке</option>
                      <option value="rejected">Отказ</option>
                      <option value="done">Обработано</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label"><b>Комментарий администратора</b></label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      placeholder="Введите комментарий..."
                    />
                  </div>

                  {/* Лог отправок email */}
                  {(() => {
                    const logs = parseEmailLog(selected.emailLog);
                    if (logs.length === 0) return null;
                    return (
                      <div className="col-12">
                        <label className="form-label"><b>История отправок на email</b></label>
                        <ul className="list-group list-group-flush">
                          {logs.map((log, idx) => (
                            <li key={idx} className="list-group-item text-muted px-0 py-1">
                              <small>
                                Отправлено {new Date(log.sentAt).toLocaleString("ru-RU")} на {log.toEmail}
                              </small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}

                  <div className="col-12 border-top pt-3">
                    <label className="form-label"><b>Отправить заявку на email</b></label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email@example.com"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={handleSendEmail}
                        disabled={sendEmailMutation.isPending || !emailTo.trim()}
                      >
                        {sendEmailMutation.isPending ? "Отправка..." : "Отправить"}
                      </button>
                    </div>
                    {emailSuccess && <div className="alert alert-success mt-2 py-1">{emailSuccess}</div>}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Закрыть
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Сохранение..." : "Сохранить изменения"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
