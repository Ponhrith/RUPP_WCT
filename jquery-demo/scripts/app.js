$(document).ready(function() {
    
    const homePageTemplate = `
        <h1>Home page</h1>
    `;

    const employeePageTemplate = `
        <table id="tableEmployee" class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newEmployeeModal">
                            + New
                        </a>
                        
                        <div class="modal fade" id="newEmployeeModal" tabindex="-1" aria-labelledby="newEmployeeModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h1 class="modal-title fs-5" id="newEmployeeModalLabel">New Employee</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="newFullName" class="form-label">Full Name</label>
                                            <input type="text" class="form-control" id="newFullName">
                                        </div>

                                        <div class="mb-3">
                                            <p><label for="gender" class="form-label">Gender</label></p>
                                            
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="newGender" id="genderM" value="Male">
                                                <label class="form-check-label" for="newGender">Male</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="newGender" id="genderF" value="Female">
                                                <label class="form-check-label" for="newGender">Female</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="newGender" id="genderOther" value="Other">
                                                <label class="form-check-label" for="genderOther">Other</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button id="btnSaveEmployee" type="button" class="btn btn-primary">Save</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    const contactPageTemplate = `
        <h1>Contact us</h1>
    `;

    function insertRowEmployees(employee) {
        $('#tableEmployee tbody').append(`
            <tr>
                <td>${employee.id}</td>
                <td>${employee.fullname}</td>
                <td>${employee.gender}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary">Edit</button>
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                </td>
            </tr>
        `);
    }

    function saveEmployee() {
        const fullname = $('#newFullName').val();
        let gender = $("input[name='newGender']:checked").val();
    
        const newEmployee = {
            "fullname": fullname,
            gender
        };
        $.ajax({
            url: 'http://localhost:3000/employees',
            method: 'POST',
            data: newEmployee,
            success: function(employee) {
                insertRowEmployees(employee);
                const myModalEl = $('#newEmployeeModal');
                const modal = bootstrap.Modal.getInstance(myModalEl)
                modal.hide();
            },
            error: function(err) {
                console.log(err);
            }
        });
        
    }

    function loadEmployees() {
        $.ajax({
            url: 'http://localhost:3000/employees',
            method: 'GET',
            success: function(data) {
                $.each(data, function(key, employee) {
                    insertRowEmployees(employee);
                });
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    function loadPage(pageId) {
        const pageContent = $('#root');
        switch (pageId) {
            case 'employeePage':
                document.title = 'Employees';
                pageContent.html(employeePageTemplate);
                loadEmployees();
                break;
            case 'contactPage':
                document.title = 'Contact Us';
                pageContent.html(contactPageTemplate);
                break;
            default: {
                document.title = 'Home';
                pageContent.html(homePageTemplate);
            }
        }
    }

    $('a').on('click', function(e) {
        e.preventDefault();
        const pageId = $(this).attr('href');
        loadPage(pageId);
        localStorage.setItem('pageId', pageId);
    });

    $('#root').on('click', '#btnSaveEmployee', function() {
        saveEmployee();
    });

    loadPage(localStorage.getItem('pageId') ?? 'homePage');
});
