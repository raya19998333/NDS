// ===================================
// NAMA Services - Main JavaScript
// Modern Utility Management Portal
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Global State Management
    // ===================================
    const state = {
        currentSection: 'dashboard',
        notifications: [],
        serviceRequests: [],
        meterReadings: []
    };

    // ===================================
    // Navigation Management
    // ===================================
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    // Mobile menu elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    // Navigation titles for each section
    const sectionTitles = {
        'dashboard': {
            title: 'Dashboard',
            subtitle: 'Welcome back! Here\'s your usage overview'
        },
        'service-request': {
            title: 'Service Requests',
            subtitle: 'Submit new service requests or report issues'
        },
        'meter-reading': {
            title: 'Meter Reading',
            subtitle: 'Submit your monthly meter readings'
        },
        'bills': {
            title: 'Bills & Reports',
            subtitle: 'View and download your invoices'
        },
        'notifications': {
            title: 'Notifications',
            subtitle: 'Stay updated with important alerts'
        },
        'track-requests': {
            title: 'Track Requests',
            subtitle: 'Monitor your service request status'
        }
    };

    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Switch between sections
    function switchSection(sectionId) {
        // Update active states
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));
        
        // Activate target section
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        // Update page title
        if (sectionTitles[sectionId]) {
            pageTitle.textContent = sectionTitles[sectionId].title;
            pageSubtitle.textContent = sectionTitles[sectionId].subtitle;
        }
        
        // Update state
        state.currentSection = sectionId;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Initialize section-specific features
        if (sectionId === 'dashboard') {
            initializeCharts();
        }
    }

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // ===================================
    // Chart Initialization (Chart.js)
    // ===================================
    function initializeCharts() {
        // Electricity Consumption Chart
        const electricityCtx = document.getElementById('electricityChart');
        if (electricityCtx && !electricityCtx.chartInstance) {
            electricityCtx.chartInstance = new Chart(electricityCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'kWh Consumed',
                        data: [105, 125, 110, 118],
                        borderColor: '#FFB020',
                        backgroundColor: 'rgba(255, 176, 32, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#FFB020',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#FFB020',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + ' kWh';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Water Consumption Chart
        const waterCtx = document.getElementById('waterChart');
        if (waterCtx && !waterCtx.chartInstance) {
            waterCtx.chartInstance = new Chart(waterCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'm³ Consumed',
                        data: [3.2, 2.9, 3.1, 3.3],
                        borderColor: '#00A8E8',
                        backgroundColor: 'rgba(0, 168, 232, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#00A8E8',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#00A8E8',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + ' m³';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Annual Usage Report Chart
        const annualCtx = document.getElementById('annualUsageChart');
        if (annualCtx && !annualCtx.chartInstance) {
            annualCtx.chartInstance = new Chart(annualCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Electricity (kWh)',
                            data: [450, 420, 480, 510, 580, 620, 650, 640, 590, 520, 470, 458],
                            backgroundColor: 'rgba(255, 176, 32, 0.8)',
                            borderColor: '#FFB020',
                            borderWidth: 2,
                            borderRadius: 8
                        },
                        {
                            label: 'Water (m³)',
                            data: [12, 11, 13, 14, 15, 16, 17, 16, 15, 13, 12, 12.5],
                            backgroundColor: 'rgba(0, 168, 232, 0.8)',
                            borderColor: '#00A8E8',
                            borderWidth: 2,
                            borderRadius: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    // Initialize charts on load
    initializeCharts();

    // ===================================
    // Service Request Form Handling
    // ===================================
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    const resetRequestBtn = document.getElementById('resetRequestForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const requestIdDisplay = document.getElementById('requestId');

    // Form validation function
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            // Remove previous error state
            formGroup.classList.remove('error');
            
            // Check if field is empty
            if (!input.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'This field is required';
                isValid = false;
            }
            
            // Validate phone number format
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^\+968\s?\d{4}\s?\d{4}$/;
                if (!phoneRegex.test(input.value)) {
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid phone number (+968 XXXX XXXX)';
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    // Service request form submission
    if (serviceRequestForm) {
        serviceRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                showLoading();
                
                // Simulate API call
                setTimeout(() => {
                    hideLoading();
                    
                    // Generate request ID
                    const requestId = 'SR-2024-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
                    requestIdDisplay.textContent = requestId;
                    
                    // Show success modal
                    successModal.classList.add('active');
                    
                    // Reset form
                    serviceRequestForm.reset();
                    
                    // Clear file list
                    document.getElementById('fileList').innerHTML = '';
                }, 1500);
            }
        });
    }

    // Reset form button
    if (resetRequestBtn) {
        resetRequestBtn.addEventListener('click', function() {
            serviceRequestForm.reset();
            // Clear all error states
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
            });
            document.getElementById('fileList').innerHTML = '';
        });
    }

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }

    // Close modal on background click
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // ===================================
    // File Upload Handling
    // ===================================
    const fileInput = document.getElementById('attachments');
    const fileList = document.getElementById('fileList');

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            fileList.innerHTML = '';
            const files = Array.from(e.target.files);
            
            files.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <i class="fas fa-file"></i>
                    <span>${file.name}</span>
                    <small>(${formatFileSize(file.size)})</small>
                `;
                fileList.appendChild(fileItem);
            });
        });
    }

    // Format file size helper
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // ===================================
    // Meter Reading Form Handling
    // ===================================
    const meterReadingForm = document.getElementById('meterReadingForm');
    const resetMeterBtn = document.getElementById('resetMeterForm');

    if (meterReadingForm) {
        meterReadingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                showLoading();
                
                // Simulate API call
                setTimeout(() => {
                    hideLoading();
                    
                    // Show success message
                    showNotification('Meter readings submitted successfully!', 'success');
                    
                    // Reset form
                    meterReadingForm.reset();
                }, 1500);
            }
        });
    }

    if (resetMeterBtn) {
        resetMeterBtn.addEventListener('click', function() {
            meterReadingForm.reset();
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
            });
        });
    }

    // ===================================
    // Real-time Input Validation
    // ===================================
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (!this.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'This field is required';
            } else {
                formGroup.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (this.value.trim()) {
                formGroup.classList.remove('error');
            }
        });
    });

    // ===================================
    // Alert Dismissal
    // ===================================
    document.querySelectorAll('.btn-close-alert').forEach(btn => {
        btn.addEventListener('click', function() {
            const alert = this.closest('.alert');
            alert.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
    });

    // ===================================
    // Notifications Management
    // ===================================
    const markAllReadBtn = document.getElementById('markAllRead');
    
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update notification badge
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
            
            showNotification('All notifications marked as read', 'success');
        });
    }

    // Individual notification click
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });

    // ===================================
    // Search Functionality
    // ===================================
    const searchInput = document.getElementById('searchRequests');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const requestItems = document.querySelectorAll('.request-item');
            
            requestItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // ===================================
    // Bill Download Functionality
    // ===================================
    window.downloadBill = function(billId) {
        showLoading();
        
        // Simulate PDF generation
        setTimeout(() => {
            hideLoading();
            showNotification(`Bill ${billId} downloaded successfully!`, 'success');
        }, 1000);
    };

    // ===================================
    // Loading Overlay Functions
    // ===================================
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
    }
    
    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
    }

    // ===================================
    // Toast Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `toast-notification toast-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles for toast notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00C48C' : '#4D94FF'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 4000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Language Toggle (Placeholder)
    // ===================================
    const languageToggle = document.getElementById('languageToggle');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            showNotification('Language switching feature coming soon!', 'info');
        });
    }

    // ===================================
    // Notification Icon Click
    // ===================================
    const notificationIcon = document.getElementById('notificationIcon');
    
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            switchSection('notifications');
        });
    }

    // ===================================
    // Pay Now Button Handlers
    // ===================================
    document.querySelectorAll('.btn-pay').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Payment gateway integration coming soon!', 'info');
        });
    });

    document.querySelectorAll('.bill-actions .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Payment gateway integration coming soon!', 'info');
        });
    });

    // ===================================
    // Chart Period Selectors
    // ===================================
    const electricityPeriod = document.getElementById('electricityPeriod');
    const waterPeriod = document.getElementById('waterPeriod');

    if (electricityPeriod) {
        electricityPeriod.addEventListener('change', function() {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification('Chart updated to show ' + this.options[this.selectedIndex].text, 'success');
            }, 500);
        });
    }

    if (waterPeriod) {
        waterPeriod.addEventListener('change', function() {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification('Chart updated to show ' + this.options[this.selectedIndex].text, 'success');
            }, 500);
        });
    }

    // ===================================
    // Smooth Scroll Enhancement
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Auto-format Phone Number Input
    // ===================================
    const phoneInput = document.getElementById('contactPhone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Auto-add +968 prefix if not present
            if (value.length > 0 && !value.startsWith('968')) {
                value = '968' + value;
            }
            
            // Format: +968 XXXX XXXX
            if (value.length > 3) {
                value = '+' + value.substring(0, 3) + ' ' + value.substring(3, 7) + (value.length > 7 ? ' ' + value.substring(7, 11) : '');
            } else if (value.length > 0) {
                value = '+' + value;
            }
            
            e.target.value = value;
        });
    }

    // ===================================
    // Meter Reading Validation
    // ===================================
    const electricityReading = document.getElementById('electricityReading');
    const waterReading = document.getElementById('waterReading');

    if (electricityReading) {
        electricityReading.addEventListener('input', function() {
            const currentValue = parseFloat(this.value);
            const previousValue = 12450; // This would come from backend
            
            if (currentValue < previousValue) {
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                formGroup.classList.add('error');
                errorMessage.textContent = 'Reading cannot be less than previous reading';
            }
        });
    }

    if (waterReading) {
        waterReading.addEventListener('input', function() {
            const currentValue = parseFloat(this.value);
            const previousValue = 1250; // This would come from backend
            
            if (currentValue < previousValue) {
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                formGroup.classList.add('error');
                errorMessage.textContent = 'Reading cannot be less than previous reading';
            }
        });
    }

    // ===================================
    // Accessibility Enhancements
    // ===================================
    
    // Keyboard navigation for cards
    document.querySelectorAll('.stat-card, .bill-card, .notification-item').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });

    // ===================================
    // Initialization Complete
    // ===================================
    console.log('NAMA Services Portal Initialized Successfully');
    
    // Show welcome notification (optional)
    setTimeout(() => {
        showNotification('Welcome to NAMA Services Portal!', 'success');
    }, 500);

    // ===================================
    // Window Resize Handler
    // ===================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
            }
            
            // Reinitialize charts if needed
            if (state.currentSection === 'dashboard') {
                initializeCharts();
            }
        }, 250);
    });

    // ===================================
    // Service Worker Registration (PWA Support)
    // ===================================
    if ('serviceWorker' in navigator) {
        // Uncomment when ready for PWA
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registered:', registration);
        // }).catch(function(error) {
        //     console.log('ServiceWorker registration failed:', error);
        // });
    }

    // ===================================
    // Dark Mode Toggle (Future Enhancement)
    // ===================================
    // const darkModeToggle = document.getElementById('darkModeToggle');
    // if (darkModeToggle) {
    //     darkModeToggle.addEventListener('click', function() {
    //         document.body.classList.toggle('dark-mode');
    //         localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    //     });
    // }

    // ===================================
    // Export Functionality Placeholders
    // ===================================
    window.exportReport = function(format) {
        showLoading();
        setTimeout(() => {
            hideLoading();
            showNotification(`Report exported as ${format}`, 'success');
        }, 1000);
    };

    // ===================================
    // Filter Functionality for Bills
    // ===================================
    const billFilter = document.querySelector('.filter-select');
    
    if (billFilter) {
        billFilter.addEventListener('change', function() {
            const filterValue = this.value;
            const billCards = document.querySelectorAll('.bill-card');
            
            billCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const hasClass = card.classList.contains(filterValue);
                    card.style.display = hasClass ? 'block' : 'none';
                }
            });
            
            showNotification(`Showing ${filterValue} bills`, 'info');
        });
    }

    // ===================================
    // Auto-save Form Data (Local Storage)
    // ===================================
    const formsToAutosave = ['serviceRequestForm', 'meterReadingForm'];
    
    formsToAutosave.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            // Load saved data
            const savedData = localStorage.getItem(formId);
            if (savedData) {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const input = form.querySelector(`[name="${key}"], #${key}`);
                    if (input) {
                        input.value = data[key];
                    }
                });
            }
            
            // Save on change
            form.addEventListener('change', function() {
                const formData = {};
                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    if (input.id && input.type !== 'file') {
                        formData[input.id] = input.value;
                    }
                });
                localStorage.setItem(formId, JSON.stringify(formData));
            });
            
            // Clear on successful submission
            form.addEventListener('submit', function() {
                localStorage.removeItem(formId);
            });
        }
    });

    // ===================================
    // Performance Monitoring
    // ===================================
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        });
    }

});

// ===================================
// Utility Functions (Global Scope)
// ===================================

// Format currency
function formatCurrency(amount, currency = 'OMR') {
    return `${currency} ${parseFloat(amount).toFixed(2)}`;
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// End of Main JavaScript
// ===================================
